import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControlName,
  FormControl,
} from '@angular/forms';
import { ApiEmpresaService } from '../../services/apiEmpresa/api-empresa.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-empresa',
  templateUrl: './dialog-empresa.component.html',
  styleUrls: ['./dialog-empresa.component.scss'],
})
export class DialogEmpresaComponent implements OnInit {
  empresaForm!: FormGroup;
  btnAccion: string = 'Guardar';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiEmpresaService: ApiEmpresaService,
    private dialogRef: MatDialogRef<DialogEmpresaComponent>
  ) {}

  ngOnInit(): void {
    this.empresaForm = this.formBuilder.group({
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
      this.empresaForm.controls['dni'].setValue(this.editData.DNI);
      this.empresaForm.controls['nombre'].setValue(this.editData.Nombre);
      this.empresaForm.controls['apellidos'].setValue(this.editData.Apellidos);
    }
  }

  addEmpleado(data: any) {
    this.empresaForm.addControl(
      'Foto',
      new FormControl('', Validators.required)
    );
    this.empresaForm.addControl(
      'Negocio_oid',
      new FormControl(0, Validators.required)
    );
    this.empresaForm.removeControl('rol');
    this.empresaForm.removeControl('lugar');
    this.empresaForm.patchValue({
      Foto: 'string',
      Negocio_oid: 98304,
    });
    if (!this.editData) {
      if (this.empresaForm.valid) {
        this.apiEmpresaService.add(this.empresaForm.value).subscribe({
          next: (res) => {
            console.log('Empleado agregado');
            this.empresaForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: () => {
            alert('Error al momento de agregar un nuevo Empleado');
          },
        });
      }
    } else {
      this.updateEmpleado(this.empresaForm.value.dni, this.empresaForm.value);
    }
  }
  updateEmpleado(id: string, data: any) {
    this.apiEmpresaService.update('idEmpresa', id, data).subscribe({
      next: (res) => {
        console.log('Empresa modificado');
        this.empresaForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        alert('Error al momento de editar un nuevo Empresa');
      },
    });
  }
  getEmpresa() {
    return this.apiEmpresaService.getList();
  }
}
