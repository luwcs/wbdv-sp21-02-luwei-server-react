// const COURSES_URL = "https://wbdv-generic-server.herokuapp.com/api/001056134/courses"
// const QUIZZES_URL = "https://wbdv-sp21-02-luwei-node.herokuapp.com/api";
const QUIZZES_URL = "http://wbdv-sp21-02-luwei-node.herokuapp.com/api";

// export const createQuizForCourse = (courseId, quiz) =>
//     fetch(``, {
//       method: "POST",
//       body: JSON.stringify(quiz),
//       headers: {
//         'content-type': 'application/json'
//       }
//     })
//     .then(response => response.json())

export const findQuizzesForCourse = (courseId) =>
    fetch(`${QUIZZES_URL}/quizzes` )
    .then(response => response.json())

export const findQuiz = (quizId) =>
    fetch(`${QUIZZES_URL}/quizzes/${quizId}`)
    .then(response => response.json())

const submitQuiz = (quizId, questions) =>
  fetch(`${QUIZZES_URL}/quizzes/${quizId}/attempts`,
      {
        method: 'POST',
        body: JSON.stringify(questions),
        headers: {
          'content-type': 'application/json'
        }})
  .then(response => response.json())

// export const updateQuiz = (courseId, quiz) => {
//   return fetch(``, {
//     method: "PUT",
//     body: JSON.stringify(quiz),
//     headers: {
//       'content-type': 'application/json'
//     }
//   })
//   .then(response => response.json())
// }
//
// export const deleteQuiz = (quizId) =>
//     fetch(``, {
//       method: "DELETE"
//     })
//     .then(response => response.json())

const api = {
  findQuizzesForCourse,
  findQuiz,
  submitQuiz
  // createQuizForCourse,
  // updateQuiz,
  // deleteQuiz
}

export default api