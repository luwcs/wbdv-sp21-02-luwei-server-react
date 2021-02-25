import React from 'react'
import CourseTable from "../course-table/course-table";
import CourseGrid from "../course-grid/course-grid";
import {Route} from "react-router-dom";
import courseService, {findAllCourses, deleteCourse} from "../../services/course-service";

export default class CourseManager
  extends React.Component {
  state = {
    courses: [],
    newTitle: "",
  }

  componentDidMount() {
    courseService.findAllCourses()
      .then(courses => this.setState({courses}))
  }

  updateCourse = (course) => {
    courseService.updateCourse(course._id, course)
      .then(status => this.setState((prevState) => ({
        ...prevState,
        courses: prevState.courses.map(c => {
          if (c._id === course._id) {
            return course
          } else {
            return c
          }
        })
      })))
  }

  deleteCourse = (course) => {

    courseService.deleteCourse(course._id)
      .then(status => {
        this.setState((prevState) => ({
          courses: prevState.courses.filter(c => c._id !== course._id)
        }))
      })
  }

  addCourse = () => {
    document.getElementById("new-course-title").value=""
    const newCourse = {
      title: "New Course",
      owner: "me",
      lastModified: "2/10/2021"
    }
    courseService.createCourse(newCourse)
      .then(actualCourse => {
        this.state.courses.push(actualCourse)
        this.setState(this.state) // notify state has changed and re-render
        this.setNewTitle("")
      })
  }

  setNewTitle(newTitle) {
    this.setState((prevState) => ({
      ...prevState,
      newTitle: newTitle
    }))
  }

  render() {
    return(
      <div>
        <div className="wbdv-sticky-nav-bar">
          <div className="row align-items-center">
            <div className="col-1">
              <i className="fas fa-bars fa-2x"></i>
            </div>
            <div className="col-2 d-none d-lg-block">
              Course Manager
            </div>
            <div className="col-7">
              <input
                  onChange={(event) => this.setNewTitle(event.target.value)}
                  id="new-course-title"
                  value={this.title}
                  className="form-control"
                  placeholder="New Course Title"/>
            </div>
            <div className="col-1">
              <i onClick={this.addCourse} className="fas fa-plus-square fa-2x"></i>
            </div>
          </div>
        </div>

        <div className="content-padding">
          <Route path="/courses/grid">
            <CourseGrid
                updateCourse={this.updateCourse}
                deleteCourse={this.deleteCourse}
                courses={this.state.courses}/>
          </Route>
          <Route path="/courses/table">
            <CourseTable
              updateCourse={this.updateCourse}
              deleteCourse={this.deleteCourse}
              courses={this.state.courses}/>
          </Route>
        </div>
      </div>
    )
  }
}



