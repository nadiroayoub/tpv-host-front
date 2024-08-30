import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ApiProveedorService } from '../../services/ApiProveedor/api-proveedor.service';

@Component({
  selector: 'app-dialog-proveedor',
  templateUrl: './dialog-proveedor.component.html',
  styleUrls: ['./dialog-proveedor.component.scss'],
})
export class DialogProveedorComponent implements OnInit {
  proveedorForm!: FormGroup;
  btnAccion: string = 'Guardar';
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  telefonoRegex = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;
  hide = true;
  hideConfirmPassword = true;
  titleAccion: string = 'Agregar';

  constructor(
    private formBuilder: FormBuilder,
    private apiProveedorService: ApiProveedorService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogProveedorComponent>
  ) {}

  ngOnInit(): void {
    this.proveedorForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    });
    if (this.editData) {
      this.titleAccion = this.btnAccion = 'Editar';
      this.proveedorForm.controls['id'].setValue(this.editData.Id);
      this.proveedorForm.controls['nombre'].setValue(this.editData.Nombre);
      this.proveedorForm.controls['apellidos'].setValue(this.editData.Telefono);
      this.proveedorForm.controls['email'].setValue(this.editData.Email);
    }
    this.getProveedor();
    this.proveedorForm.valueChanges.subscribe((selectedValue) => {});
  }

  //#region Proveedor API
  addProveedor(data: any) {
    if (!this.editData) {
      if (this.proveedorForm.valid) {
        this.apiProveedorService.add(this.proveedorForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Empleado creado',
              showConfirmButton: false,
              timer: 3500,
            });
            this.proveedorForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              heightAuto: false,
              title: 'Correo electronico o DNI ya existen',
            });
          },
        });
      }
    } else {
      this.updateProveedor(
        this.proveedorForm.value.id,
        this.proveedorForm.value
      );
    }
  }
  updateProveedor(id: string, data: any) {
    this.apiProveedorService.update('idProveedor', id, data).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Empleado editado!',
          showConfirmButton: false,
          timer: 3500,
        });
        this.proveedorForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        alert('Error al momento de editar un Empleado');
      },
    });
  }
  getProveedor() {
    return this.apiProveedorService.getList();
  }
  //#endregion
}
