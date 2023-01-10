import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiCajaService } from 'src/app/services/apiCaja/api-caja.service';
import { ApiDuenyoService } from 'src/app/services/apiDuenyo/api-duenyo.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import Swal from 'sweetalert2';
import { DialogEmpleadoComponent } from '../dialog-empleado/dialog-empleado.component';
import { ApiClienteService } from '../../services/apiCliente/api-cliente.service';
import { Negocio } from 'src/app/shared/models/Negocio';

@Component({
  selector: 'app-dialog-cliente',
  templateUrl: './dialog-cliente.component.html',
  styleUrls: ['./dialog-cliente.component.scss'],
})
export class DialogClienteComponent implements OnInit {
  clienteForm!: FormGroup;
  btnAccion: string = 'Guardar';
  negocios!: Negocio[];
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  hide = true;
  hideConfirmPassword = true;
  titleAccion: string = 'Agregar';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiClienteService: ApiClienteService,
    private apiNegocioService: ApiNegocioService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<DialogEmpleadoComponent>
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      id: [''],
      dni: ['', [Validators.required, Validators.pattern(this.nifNieRegex)]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: [''],
      Negocio_oid: ['', Validators.required],
    });
    if (this.editData) {
      this.titleAccion = this.btnAccion = 'Editar';

      this.clienteForm.controls['id'].setValue(this.editData.Id);
      this.clienteForm.controls['dni'].setValue(this.editData.Dni);
      this.clienteForm.controls['nombre'].setValue(this.editData.Nombre);
      this.clienteForm.controls['apellidos'].setValue(this.editData.Apellidos);
      this.clienteForm.controls['email'].setValue(this.editData.Email);
      this.clienteForm.controls['Negocio_oid'].setValue(
        this.editData.Negocio.Id
      );
    }
    this.getNegocios();
    this.clienteForm.valueChanges.subscribe((selectedValue) => {});
  }

  //#region Negocios API
  getNegocios() {
    this.apiNegocioService.getList().subscribe({
      next: (res) => {
        this.negocios = res;
      },
      error: (err) => {
        alert('Error while fetching Negocio:/Negocio/ReadAll records!');
      },
    });
  }
  //#endregion
  //#region Cliente API
  addCliente(data: any) {
    if (!this.editData) {
      if (this.clienteForm.valid) {
        this.apiClienteService.add(this.clienteForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Cliente creado!',
              showConfirmButton: false,
              timer: 3500,
            });
            this.clienteForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              heightAuto: false,
              title: 'Error a agregar un cliente',
            });
          },
        });
      }
    } else {
      this.updateCliente(this.clienteForm.value.id, this.clienteForm.value);
    }
  }
  updateCliente(id: string, data: any) {
    this.apiClienteService.update('idCliente', id, data).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente editado!',
          showConfirmButton: false,
          timer: 3500,
        });
        this.clienteForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          heightAuto: false,
          title: 'DNI ya existe',
        });
      },
    });
  }
  getClientes() {
    return this.apiClienteService.getList();
  }
  //#endregion
}
