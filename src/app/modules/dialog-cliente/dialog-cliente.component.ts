import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      dni: ['', [Validators.required, Validators.pattern(this.nifNieRegex)]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      Negocio_oid: ['', Validators.required],
    });
    if (this.editData) {
      this.titleAccion = this.btnAccion = 'Editar';
      this.clienteForm.controls['id'].setValue(this.editData.Id);
      this.clienteForm.controls['descripcion'].setValue(
        this.editData.Descripcion
      );
      this.clienteForm.controls['Negocio_oid'].setValue(
        this.editData.Negocio.Id
      );
    }
    this.getNegocios();
    this.clienteForm.valueChanges.subscribe((selectedValue) => {
      console.log(this.clienteForm.valid);
    });
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
    // this.clienteForm.addControl(
    //   'Foto',
    //   new FormControl('', Validators.required)
    // );
    // this.clienteForm.controls['Duenyo_oid'].setValue(
    //   this.authService.usuario.Id
    // );
    // this.clienteForm.patchValue({
    //   Foto: 'string',
    // });
    if (!this.editData) {
      if (this.clienteForm.valid) {
        console.log(this.clienteForm.value);
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
        alert('Error al momento de editar un Cliente');
      },
    });
  }
  getClientes() {
    return this.apiClienteService.getList();
  }
  //#endregion
}
