// Function to generate random role distribution based on total players
export function generateRandomRoles(totalPlayers) {
   // Ensure minimum players
   if (totalPlayers < 4) totalPlayers = 4;

   let roles = {
      mans: 0,
      mafias: 0,
      doctor: 0,
      cop: 0,
      kamikaze: 0,
      maniac: 0,
      security: 0,
      lawyer: 0
   };

   // Base distribution logic
   // Mafia: 15-25% of players
   const mafiaCount = Math.max(1, Math.min(Math.floor(totalPlayers * 0.25), Math.floor(totalPlayers * 0.15) || 1));
   roles.mafias = mafiaCount;

   // Doctor and Cop: usually 1 each for smaller games, up to 2 for larger
   const specialRoleCount = totalPlayers > 10 ? 2 : 1;
   roles.doctor = Math.random() > 0.5 ? specialRoleCount : 0;
   roles.cop = roles.doctor === specialRoleCount ? 0 : specialRoleCount;

   // Remaining players for civilians and optional roles
   let remainingPlayers = totalPlayers - roles.mafias - roles.doctor - roles.cop;

   // Civilians get the rest minus optional roles
   const optionalRoles = ['kamikaze', 'maniac', 'security', 'lawyer'];
   const optionalRoleCount = Math.min(remainingPlayers - 1, Math.floor(totalPlayers / 8)); // Max 1 optional role per 8 players

   // Randomly assign optional roles
   for (let i = 0; i < optionalRoleCount && remainingPlayers > 1; i++) {
      const randomRole = optionalRoles[Math.floor(Math.random() * optionalRoles.length)];
      if (roles[randomRole] === 0) { // Don't duplicate roles
         roles[randomRole] = 1;
         remainingPlayers--;
      }
   }

   // Rest are civilians
   roles.mans = Math.max(1, remainingPlayers);

   // Final validation
   const totalAssigned = Object.values(roles).reduce((sum, count) => sum + count, 0);
   if (totalAssigned !== totalPlayers) {
      // Adjust civilians if there's a mismatch
      roles.mans += (totalPlayers - totalAssigned);
      roles.mans = Math.max(1, roles.mans);
   }

   return roles;
}