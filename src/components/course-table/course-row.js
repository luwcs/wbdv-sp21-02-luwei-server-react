import React, {useState} from 'react'
import {Link} from "react-router-dom";

const CourseRow = (
    {
      course,
      deleteCourse,
      updateCourse
    }) => {
      const [editing, setEditing] = useState(false)
      const [title, setTitle] = useState(course.title)

      const saveCourse = () => {
        setEditing(false)
        const newCourse = {
          ...course,
          title: title
        }
        updateCourse(newCourse)
      }

      const localDeleteCourse = () => {
        setEditing(false)
        const newCourse = {
          ...course,
          title: title
        }
        deleteCourse(newCourse)
      }

      return (
        <tr>
          <td>
            {
              !editing &&
              <Link to="/courses/editor">
                {course.title}
              </Link>
            }
            {
              editing &&
              <input
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}/>
            }
          </td>
          <td className ="d-none d-md-table-cell">{course.owner}</td>
          <td className ="d-none d-lg-table-cell">{course.lastModified}</td>
          <td>
            {editing && <i onClick={() => localDeleteCourse()} className="fas fa-trash"></i>}
            {editing && <i onClick={() => saveCourse()} className="fas fa-check"></i>}
            {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit"></i>}
          </td>
        </tr>
      )
    }

export default CourseRow
