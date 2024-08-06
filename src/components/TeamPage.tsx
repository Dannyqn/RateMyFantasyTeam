import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './TeamPage.module.css'; // Import the CSS module for styling

type Member = {
  name: string;
};

type Team = {
  name: string;
  description: string;
  members: Member[];
};

const initialTeam: Team = {
  name: '',
  description: '',
  members: [],
};

const MAX_MEMBERS = 17;

const TeamPage: React.FC = () => {
  const [team, setTeam] = useState<Team>(initialTeam);
  const [newMember, setNewMember] = useState<Member>({ name: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTeam({ ...team, [name]: value });
  };

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const addMember = () => {
    if (team.members.length < MAX_MEMBERS) {
      setTeam({ ...team, members: [...team.members, newMember] });
      setNewMember({ name: '' });
    } else {
      alert("Cannot add more than 17 members.");
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you can add code to save the team data to a server or local storage
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const items = Array.from(team.members);
    const [movedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, movedItem);

    setTeam({ ...team, members: items });
  };

  // Split members into two columns
  const splitIndex = Math.ceil(team.members.length / 2);
  const firstColumnMembers = team.members.slice(0, splitIndex);
  const secondColumnMembers = team.members.slice(splitIndex);

  // Calculate placeholders needed to reach MAX_MEMBERS in each column
  const firstColumnPlaceholders = Math.max(0, 8 - firstColumnMembers.length);
  const secondColumnPlaceholders = Math.max(0, 9 - secondColumnMembers.length);

  // Calculate the number of placeholders for the special "IR/IL" label
  const lastTwoPlaceholders = Math.min(2, secondColumnPlaceholders);

  return (
    <div className={styles.teamPage}>
      <div className={styles.teamContent}>
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={team.name}
              onChange={handleTeamChange}
              className={styles.teamInput}
              placeholder="Team Name"
            />
            <textarea
              name="description"
              value={team.description}
              onChange={handleTeamChange}
              className={styles.teamTextarea}
              placeholder="Team Description"
            />
            <div className={styles.memberForm}>
              <input
                type="text"
                name="name"
                value={newMember.name}
                onChange={handleMemberChange}
                className={styles.memberInput}
                placeholder="Member Name"
              />
              <button onClick={addMember} className={styles.addMemberButton}>Add Member</button>
            </div>
            <button onClick={handleSave} className={styles.saveButton}>Save Team</button>
          </>
        ) : (
          <>
            <h2 className={styles.teamName}>{team.name}</h2>
            <p className={styles.teamDescription}>{team.description}</p>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className={styles.memberColumns}>
                <Droppable droppableId="0">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={styles.memberColumn}
                    >
                      <h3 className={styles.columnLabel}>Starters</h3>
                      {firstColumnMembers.map((member, index) => (
                        <Draggable key={`starter-${index}`} draggableId={`starter-${index}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.memberItem}
                            >
                              {member.name}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {Array.from({ length: firstColumnPlaceholders }).map((_, index) => (
                        <div key={`placeholder-${index}`} className={styles.memberPlaceholder} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <Droppable droppableId="1">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={styles.memberColumn}
                    >
                      <h3 className={styles.columnLabel}>Bench</h3>
                      {secondColumnMembers.map((member, index) => (
                        <Draggable key={`bench-${index}`} draggableId={`bench-${index}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.memberItem}
                            >
                              {member.name}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {Array.from({ length: secondColumnPlaceholders - lastTwoPlaceholders }).map((_, index) => (
                        <div key={`placeholder-${index + firstColumnMembers.length}`} className={styles.memberPlaceholder} />
                      ))}
                      {secondColumnPlaceholders > 2 && (
                        <>
                          <div className={styles.irIlLabel}>IR/IL</div>
                          {Array.from({ length: lastTwoPlaceholders }).map((_, index) => (
                            <div key={`irIlPlaceholder-${index}`} className={styles.memberPlaceholder} />
                          ))}
                        </>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
            <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit Team</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
