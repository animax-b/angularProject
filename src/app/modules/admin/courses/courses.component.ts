import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})
export class CoursesComponent implements OnInit {
  courses: Course[] | undefined;
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.GetAll().subscribe(res => {
      if (res.status == 200 && res.body != null)
        this.courses = res.body;
    });
  }
}
