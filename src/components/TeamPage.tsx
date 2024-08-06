import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './TeamPage.module.css'; // Import the CSS module for styling
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { useNavigate } from 'react-router-dom';

type Member = {
  name: string;
  position: string;
};

type Team = {
  id: string; // Unique identifier for the team
  format: string;
  leagueMembers: number;
  platform: string;
  starters: Member[];
  bench: Member[];
  irIl: Member[];
};

const initialTeam: Team = {
  id: '', // Initialize this in useEffect
  format: 'PPR',
  leagueMembers: 4,
  platform: 'ESPN',
  starters: [],
  bench: [],
  irIl: [],
};

const MAX_MEMBERS = 17;

const TeamPage: React.FC = () => {
  const location = useLocation();
  const [team, setTeam] = useState<Team>(initialTeam);
  const [newMember, setNewMember] = useState<Member>({ name: '', position: 'QB' });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const { state } = location;
    if (state && (state as any).team) {
      const teamData = (state as any).team;
      setTeam(teamData);
      setIsEditing(true); // Set editing mode to true when a team is loaded
    } else {
      // Initialize a new team with a unique ID if no team is provided
      setTeam({ ...initialTeam, id: Date.now().toString() });
    }
  }, [location.state]);
  
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeam({ ...team, [name]: value });
  };

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const addMemberToColumn = (column: 'starters' | 'bench' | 'irIl') => {
    if (team.starters.length + team.bench.length + team.irIl.length < MAX_MEMBERS) {
      setTeam({ ...team, [column]: [...team[column], newMember] });
      setNewMember({ name: '', position: 'QB' });
    } else {
      alert('Cannot add more than 17 members.');
    }
  };

  const handleSave = () => {
    localStorage.setItem('teamData', JSON.stringify(team)); // Save team data to local storage
    setIsEditing(false);
  };

  const handleSubmit = () => {
    const savedTeams = localStorage.getItem('teamsData');
    const existingTeams: Team[] = savedTeams ? JSON.parse(savedTeams) : [];

    if (isEditing) {
      // Update existing team
      const updatedTeams = existingTeams.map((t: Team) => {
        if (t.id === team.id) {
          return team; // Replace with the updated team
        }
        return t; // Keep existing team as is
      });
      localStorage.setItem('teamsData', JSON.stringify(updatedTeams));
    } else {
      // Add new team
      const updatedTeams = [...existingTeams, team];
      localStorage.setItem('teamsData', JSON.stringify(updatedTeams));
    }

    navigate('/profile'); // Navigate to the profile page
  };
  
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceDroppableId = source.droppableId as 'starters' | 'bench' | 'irIl';
    const destinationDroppableId = destination.droppableId as 'starters' | 'bench' | 'irIl';

    const sourceColumn = Array.from(team[sourceDroppableId]);
    const destinationColumn = Array.from(team[destinationDroppableId]);

    const [moved] = sourceColumn.splice(source.index, 1);

    if (sourceDroppableId === destinationDroppableId) {
      sourceColumn.splice(destination.index, 0, moved);
      setTeam({ ...team, [sourceDroppableId]: sourceColumn });
    } else {
      destinationColumn.splice(destination.index, 0, moved);
      setTeam({
        ...team,
        [sourceDroppableId]: sourceColumn,
        [destinationDroppableId]: destinationColumn,
      });
    }
  };

  // Calculate placeholders needed to reach MAX_MEMBERS in each column
  const firstColumnPlaceholders = Math.max(0, 8 - team.starters.length);
  const secondColumnPlaceholders = Math.max(0, 9 - team.bench.length); // Adjusted to 9
  const thirdColumnPlaceholders = Math.max(0, 2 - team.irIl.length); // Adjusted to 2

  return (
    <div className={styles.teamPage}>
      <div className={styles.teamContent}>
        {isEditing ? (
          <>
            <label htmlFor="format" className={styles.dropdownLabel}>
              Format
            </label>
            <select
              id="format"
              name="format"
              value={team.format}
              onChange={handleTeamChange}
              className={styles.dropdown}
            >
              <option value="PPR">PPR</option>
              <option value="0.5 PPR">0.5 PPR</option>
              <option value="Non-PPR">Non-PPR</option>
            </select>

            <label htmlFor="leagueMembers" className={styles.dropdownLabel}>
              League Members
            </label>
            <select
              id="leagueMembers"
              name="leagueMembers"
              value={team.leagueMembers}
              onChange={handleTeamChange}
              className={styles.dropdown}
            >
              {Array.from({ length: 9 }, (_, i) => i + 4).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>

            <label htmlFor="platform" className={styles.dropdownLabel}>
              Platform
            </label>
            <select
              id="platform"
              name="platform"
              value={team.platform}
              onChange={handleTeamChange}
              className={styles.dropdown}
            >
              <option value="ESPN">ESPN</option>
              <option value="Sleeper">Sleeper</option>
              <option value="Yahoo">Yahoo</option>
            </select>

            <button onClick={handleSave} className={styles.saveButton}>
              Save Team
            </button>
          </>
        ) : (
          <>
            <h2 className={styles.teamName}>{team.leagueMembers}-Man {team.format}</h2>
            <h3 className={styles.platform}>Platform: {team.platform}</h3>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className={styles.memberColumns}>
                <Droppable droppableId="starters">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={styles.memberColumn}
                    >
                      <h3 className={styles.columnLabel}>Starters</h3>
                      {team.starters.map((member, index) => (
                        <Draggable key={`starter-${index}`} draggableId={`starter-${index}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.memberItem}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                if (window.confirm('Are you sure you want to delete this player?')) {
                                  setTeam({
                                    ...team,
                                    starters: team.starters.filter((_, i) => i !== index),
                                  });
                                }
                              }}
                            >
                              {member.name} - {member.position}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {Array.from({ length: firstColumnPlaceholders }).map((_, index) => (
                        <div key={`starter-placeholder-${index}`} className={styles.memberPlaceholder} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <Droppable droppableId="bench">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={styles.memberColumn}
                    >
                      <h3 className={styles.columnLabel}>Bench</h3>
                      {team.bench.map((member, index) => (
                        <Draggable key={`bench-${index}`} draggableId={`bench-${index}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.memberItem}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                if (window.confirm('Are you sure you want to delete this player?')) {
                                  setTeam({
                                    ...team,
                                    bench: team.bench.filter((_, i) => i !== index),
                                  });
                                }
                              }}
                            >
                              {member.name} - {member.position}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {Array.from({ length: secondColumnPlaceholders }).map((_, index) => (
                        <div key={`bench-placeholder-${index}`} className={styles.memberPlaceholder} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <Droppable droppableId="irIl">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={styles.memberColumn}
                    >
                      <h3 className={styles.columnLabel}>IR/IL</h3>
                      {team.irIl.map((member, index) => (
                        <Draggable key={`irIl-${index}`} draggableId={`irIl-${index}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.memberItem}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                if (window.confirm('Are you sure you want to delete this player?')) {
                                  setTeam({
                                    ...team,
                                    irIl: team.irIl.filter((_, i) => i !== index),
                                  });
                                }
                              }}
                            >
                              {member.name} - {member.position}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {Array.from({ length: thirdColumnPlaceholders }).map((_, index) => (
                        <div key={`irIl-placeholder-${index}`} className={styles.memberPlaceholder} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>

            <div className={styles.addPlayerSection}>
              <h3 className={styles.irIlLabel}>Add a Player</h3>
              <div className={styles.memberForm}>
                <input
                  type="text"
                  name="name"
                  placeholder="Player Name"
                  value={newMember.name}
                  onChange={handleMemberChange}
                  className={styles.memberInput}
                />
                <select
                  name="position"
                  value={newMember.position}
                  onChange={handleMemberChange}
                  className={styles.dropdown}
                >
                  <option value="QB">QB</option>
                  <option value="RB">RB</option>
                  <option value="WR">WR</option>
                  <option value="TE">TE</option>
                  <option value="K">K</option>
                  <option value="DEF">DEF</option>
                </select>
                <button
                  onClick={() => addMemberToColumn('starters')}
                  className={styles.addMemberButton}
                >
                  Add to Starters
                </button>
                <button
                  onClick={() => addMemberToColumn('bench')}
                  className={styles.addMemberButton}
                >
                  Add to Bench
                </button>
                <button
                  onClick={() => addMemberToColumn('irIl')}
                  className={styles.addMemberButton}
                >
                  Add to IR/IL
                </button>
              </div>
            </div>

            <button onClick={() => setIsEditing(true)} className={styles.editButton}>
              Edit Team Information
            </button>

            <button
              onClick={handleSubmit}
              className={styles.submitTeamButton}
            >
              Submit Team
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
