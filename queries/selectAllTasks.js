module.exports = function selectAllTasks(user_id) {
   return `
         SELECT 
             *
         FROM
             tasks
         WHERE
             tasks.user_id = '${user_id}'
     `;
};
