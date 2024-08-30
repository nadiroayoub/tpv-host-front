import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { Negocio } from 'src/app/shared/models/Negocio';
import Swal from 'sweetalert2';
import { DialogEmpleadoComponent } from '../dialog-empleado/dialog-empleado.component';
import { ApiDuenyoService } from '../../services/apiDuenyo/api-duenyo.service';
import { ApiCajaService } from '../../services/apiCaja/api-caja.service';
import { Caja } from '../../shared/models/Caja';
import { Duenyo } from '../../shared/models/Duenyo';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dialog-caja',
  templateUrl: './dialog-caja.component.html',
  styleUrls: ['./dialog-caja.component.scss'],
})
export class DialogCajaComponent implements OnInit {
  cajaForm!: FormGroup;
  btnAccion: string = 'Guardar';
  cajas!: Caja[];
  negocios!: Negocio[];
  duenyos!: Duenyo[];
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  hide = true;
  hideConfirmPassword = true;
  titleAccion: string = 'Agregar';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiNegocioService: ApiNegocioService,
    private apiDuenyoService: ApiDuenyoService,
    private apiCajaService: ApiCajaService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<DialogEmpleadoComponent>
  ) {}

  ngOnInit(): void {
    this.cajaForm = this.formBuilder.group({
      id: [''],
      descripcion: [''],
      saldo: [''],
      fondo: [''],
      Negocio_oid: ['', Validators.required],
      Duenyo_oid: [''],
    });
    if (this.editData) {
      this.titleAccion = this.btnAccion = 'Editar';
      this.cajaForm.controls['id'].setValue(this.editData.Id);
      this.cajaForm.controls['descripcion'].setValue(this.editData.Descripcion);
      this.cajaForm.controls['fondo'].setValue(this.editData.Fondo);
      this.cajaForm.controls['saldo'].setValue(this.editData.Saldo);
      this.cajaForm.controls['Negocio_oid'].setValue(
        this.editData.NegocioCaja.Id
      );
      this.cajaForm.controls['Duenyo_oid'].setValue(this.editData.Duenyo.Id);
    }
    this.getNegocios();
    this.cajaForm.valueChanges.subscribe((selectedValue) => {});
  }

  //#region Caja API
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

  //#region Caja API
  addCaja(data: any) {
    this.cajaForm.addControl('Foto', new FormControl('', Validators.required));
    this.cajaForm.controls['Duenyo_oid'].setValue(this.authService.usuario.Id);
    this.cajaForm.patchValue({
      Foto: 'string',
    });
    if (!this.editData) {
      if (this.cajaForm.valid) {
        this.apiCajaService.add(this.cajaForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Caja creada!',
              showConfirmButton: false,
              timer: 3500,
              heightAuto: false,
            });
            this.cajaForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              heightAuto: false,
              title: 'Error a agregar una caja',
            });
          },
        });
      }
    } else {
      this.updateCaja(this.cajaForm.value.id, this.cajaForm.value);
    }
  }
  updateCaja(id: string, data: any) {
    this.apiCajaService.update('idCaja', id, data).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Caja editado!',
          showConfirmButton: false,
          timer: 3500,
          heightAuto: false,
        });
        this.cajaForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        alert('Error al momento de editar un Caja');
      },
    });
  }
  getCajas() {
    return this.apiCajaService.getList();
  }
  //#endregion
}
