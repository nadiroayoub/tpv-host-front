import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControlName,
  FormControl,
} from '@angular/forms';
import { ApiEmployeeService } from '../../services/apiEmployee/api-employee.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-empleado',
  templateUrl: './dialog-empleado.component.html',
  styleUrls: ['./dialog-empleado.component.scss'],
})
export class DialogEmpleadoComponent implements OnInit {
  empleadoForm!: FormGroup;
  btnAccion: string = 'Guardar';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiEmployeeService: ApiEmployeeService,
    private dialogRef: MatDialogRef<DialogEmpleadoComponent>
  ) {}

  ngOnInit(): void {
    this.empleadoForm = this.formBuilder.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      pass: ['', Validators.required],
      rol: [''],
      lugar: [''],
    });
    console.log(this.editData);
    if (this.editData) {
      this.btnAccion = 'Editar';
      this.empleadoForm.controls['dni'].setValue(this.editData.DNI);
      this.empleadoForm.controls['nombre'].setValue(this.editData.Nombre);
      this.empleadoForm.controls['apellidos'].setValue(this.editData.Apellidos);
    }
  }

  addEmpleado(data: any) {
    this.empleadoForm.addControl(
      'Foto',
      new FormControl('', Validators.required)
    );
    this.empleadoForm.addControl(
      'Negocio_oid',
      new FormControl(0, Validators.required)
    );
    this.empleadoForm.removeControl('rol');
    this.empleadoForm.removeControl('lugar');
    this.empleadoForm.patchValue({
      Foto: 'string',
      Negocio_oid: 98304,
    });
    if (!this.editData) {
      if (this.empleadoForm.valid) {
        this.apiEmployeeService.add(this.empleadoForm.value).subscribe({
          next: (res) => {
            console.log('Empleado agregado');
            this.empleadoForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: () => {
            alert('Error al momento de agregar un nuevo Empleado');
          },
        });
      }
    } else {
      this.updateEmpleado(this.empleadoForm.value.dni, this.empleadoForm.value);
    }
  }
  updateEmpleado(id: string, data: any) {
    this.apiEmployeeService.update('idEmpleado', id, data).subscribe({
      next: (res) => {
        console.log('Empleado modificado');
        this.empleadoForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        alert('Error al momento de editar un nuevo Empleado');
      },
    });
  }
  getEmpleado() {
    return this.apiEmployeeService.getList();
  }
}
