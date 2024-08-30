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
import Swal from 'sweetalert2';
import { Usuario } from '../../auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dialog-empresa',
  templateUrl: './dialog-empresa.component.html',
  styleUrls: ['./dialog-empresa.component.scss'],
})
export class DialogEmpresaComponent implements OnInit {
  empresaForm!: FormGroup;
  btnAccion: string = 'Guardar';
  titleAccion: string = 'Agregar';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiEmpresaService: ApiEmpresaService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<DialogEmpresaComponent>
  ) {}

  ngOnInit(): void {
    this.empresaForm = this.formBuilder.group({
      id: [''],
      cif: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      cp: ['', Validators.required],
      pais: ['', Validators.required],
      email: [''],
      fechaconstitucion: [''],
      telefono: [''],
    });

    if (this.editData) {
      this.titleAccion = this.btnAccion = 'Editar';

      this.empresaForm.controls['id'].setValue(this.editData.Id);
      this.empresaForm.controls['cif'].setValue(this.editData.Cif);
      this.empresaForm.controls['nombre'].setValue(this.editData.Nombre);
      this.empresaForm.controls['direccion'].setValue(this.editData.Direccion);
      this.empresaForm.controls['ciudad'].setValue(this.editData.Ciudad);
      this.empresaForm.controls['provincia'].setValue(this.editData.Provincia);
      this.empresaForm.controls['pais'].setValue(this.editData.Pais);
      this.empresaForm.controls['cp'].setValue(this.editData.Cp);
      this.empresaForm.controls['email'].setValue(this.editData.Email);
      this.empresaForm.controls['fechaconstitucion'].setValue(
        this.editData.Fechaconstitucion
      );
      this.empresaForm.controls['telefono'].setValue(this.editData.Telefono);
    }
  }
  //#region Empresa API
  addEmpresa(data: any) {
    this.empresaForm.addControl('Duenyo_oid', new FormControl(''));
    // this.empresaForm.controls['Duenyo_oid'].setValue(this.authService.usuario.Id);
    this.empresaForm.patchValue({
      Duenyo_oid: this.authService.usuario.Id,
    });
    if (!this.editData) {
      if (this.empresaForm.valid) {
        this.apiEmpresaService.add(this.empresaForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Empresa creada!',
              showConfirmButton: false,
              timer: 3500,
              heightAuto: false,
            });
            this.empresaForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              heightAuto: false,
              title: '¡No se pudo crear un empresa!',
            });
          },
        });
      }
    } else {
      this.updateEmpresa(this.empresaForm.value.id, this.empresaForm.value);
    }
  }
  updateEmpresa(id: string, data: any) {
    this.apiEmpresaService.update('idEmpresa', id, data).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Empresa editado!',
          showConfirmButton: false,
          timer: 3500,
          heightAuto: false,
        });
        this.empresaForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        alert('Error al momento de editar la Empresa');
      },
    });
  }
  getEmpresa() {
    return this.apiEmpresaService.getList();
  }
  //#endregion
}
