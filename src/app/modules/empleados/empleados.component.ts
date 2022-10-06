import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Student {
  name: string;
  subjects: string[];
  marks: number[];
  class: string;
  section: string;
}
const ELEMENT_DATA: Student[] = [
  {
    name: 'Tony',
    subjects: ['MATH', 'PHY', 'CHEM'],
    marks: [90, 95, 97],
    class: '12',
    section: 'A',
  },
  {
    name: 'Rita',
    subjects: ['MATH', 'PHY', 'BIO'],
    marks: [97, 92, 96],
    class: '12',
    section: 'A',
  },
  {
    name: 'Monty',
    subjects: ['MATH', 'PHY', 'BIO'],
    marks: [80, 99, 100],
    class: '12',
    section: 'B',
  },
  {
    name: 'Pintu',
    subjects: ['GEOLOGY', 'HISTORY'],
    marks: [90, 95],
    class: '12',
    section: 'C',
  },
  {
    name: 'Sarah',
    subjects: ['PAINTING', 'DANCE'],
    marks: [97, 100],
    class: '12',
    section: 'C',
  },
];

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'class',
    'section',
    'subjects',
    'marks',
  ];
  columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: Student) => `${element.name}`,
    },
    {
      columnDef: 'class',
      header: 'Class',
      cell: (element: Student) => `${element.class}`,
    },
    {
      columnDef: 'section',
      header: 'Section',
      cell: (element: Student) => `${element.section}`,
    },
    {
      columnDef: 'subjects',
      header: 'Subjects',
      cell: (element: Student) => `${element.subjects.join(', ')}`,
    },
    {
      columnDef: 'marks',
      header: 'Marks',
      cell: (element: Student) => `${element.marks.join(', ')}`,
    },
  ];
  dataSource!: MatTableDataSource<Student>;
  constructor() {}
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  // This is the method which get called from your filter input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }
  // This is our filter method.
  // It has to return a function
  // Method of the function should be
  // (data: InterfaceName, filter: string): boolean
  filterBySubject() {
    let filterFunction = (data: Student, filter: string): boolean => {
      if (filter) {
        const subjects = data.subjects;
        for (let i = 0; i < subjects.length; i++) {
          if (subjects[i].indexOf(filter) != -1) {
            return true;
          }
        }
        return false;
      } else {
        return true;
      }
    };
    return filterFunction;
  }
}
