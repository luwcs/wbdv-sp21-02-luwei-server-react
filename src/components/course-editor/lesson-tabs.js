import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import lessonService from '../../services/lesson-service'

const LessonTabs = (
  {
    lessons=[],
    findLessonsForModule,
    createLessonForModule,
    updateLesson,
    deleteLesson,
    clear
  }) => {
  const {layout, courseId, moduleId, lessonId} = useParams();
  useEffect(() => {
    console.log("LOAD LESSONS FOR MODULE: " + moduleId)
    if(moduleId !== "undefined" && typeof moduleId !== "undefined") {
      clear().then(() => findLessonsForModule(moduleId))
    }
  }, [moduleId])
  return (
    <nav className="navbar navbar-dark shadow-sm">

        <ul className="nav nav-tabs">
          {
            lessons.map(lesson =>
                <li className="nav-item">
                  <a className="nav-link text-light" href="#">
                    <EditableItem
                        active={lesson._id === lessonId}
                        to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                        type="nav-item"
                        highLightColor="text-dark"
                        updateItem={updateLesson}
                        deleteItem={deleteLesson}
                        key={lesson._id}
                        item={lesson}
                    />
                  </a>
                </li>
            )
          }

          <li className="list-group-item text-primary text-center border-0">
            <i onClick={() => createLessonForModule(moduleId)} className="fas fa-plus"></i>
          </li>
        </ul>

      </nav>
  )}




const stpm = (state) => ({
  lessons: state.lessonReducer.lessons
})

const dtpm = (dispatch) => ({
  createLessonForModule: (moduleId) => {
    console.log("CREATE LESSON FOR MODULE: " + moduleId)
    lessonService
    .createLessonForModule(moduleId, {title: "New Lesson"})
    .then(lesson => dispatch({
      type: "CREATE_LESSON",
      lesson
    }))
  },
  deleteLesson: (item) =>
      lessonService.deleteLesson(item._id)
      .then(status => dispatch({
        type: "DELETE_LESSON",
        lessonToDelete: item
      })),

  updateLesson: (lesson) => {
    console.log("update LESSON FOR MODULE: " + lesson.title)
    lessonService.updateLesson(lesson._id, lesson)
    .then(status => dispatch({
      type: "UPDATE_LESSON",
      lesson
    }))
  },
  clear: () => {
    dispatch({
      type: "CLEAR_TOPICS"
    })
    return Promise.resolve()
  },
  findLessonsForModule: (moduleId) => {
    console.log("LOAD LESSONS FOR MODULE:")
    console.log(moduleId)
    lessonService.findLessonsForModule(moduleId)
    .then(lessons => {
      dispatch({
        type: "FIND_LESSONS",
        lessons
      })
    })
  },
})

export default connect(stpm, dtpm)(LessonTabs)