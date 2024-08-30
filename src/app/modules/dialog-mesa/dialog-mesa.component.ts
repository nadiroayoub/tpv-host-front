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
import { ApiMesaService } from 'src/app/services/apiMesa/api-mesa.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { EstadoMesa, Mesa } from 'src/app/shared/models/Mesa';
import { Negocio } from 'src/app/shared/models/Negocio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-mesa',
  templateUrl: './dialog-mesa.component.html',
  styleUrls: ['./dialog-mesa.component.scss'],
})
export class DialogMesaComponent implements OnInit {
  mesaForm!: FormGroup;
  btnAccion: string = 'Guardar';
  mesas!: Mesa[];
  negocios!: Negocio[];
  estados;
  // duenyos!: Duenyo[];
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  hide = true;
  hideConfirmPassword = true;
  titleAccion: string = 'Agregar';
  EstadoMesa = EstadoMesa;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiNegocioService: ApiNegocioService,
    private apiMesaService: ApiMesaService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<DialogMesaComponent>
  ) {
    this.estados = Object.values(this.EstadoMesa).filter(
      (f) => !isNaN(Number(f))
    );
  }

  ngOnInit(): void {
    this.mesaForm = this.formBuilder.group({
      id: [''],
      numero: [''],
      Estado_oid: [''],
      Negocio_oid: ['', Validators.required],
    });
    if (this.editData) {
      this.titleAccion = this.btnAccion = 'Editar';
      this.mesaForm.controls['id'].setValue(this.editData.Id);
      this.mesaForm.controls['numero'].setValue(this.editData.Numero);
      // this.mesaForm.controls['Estado_oid'].setValue(this.editData.Estado);
      this.mesaForm.controls['Negocio_oid'].setValue(
        this.editData.NegocioMesa.Id
      );
      // this.mesaForm.controls['Duenyo_oid'].setValue(this.editData.Duenyo.Id);
    }
    this.getNegocios();
    this.getEstadosMesa();
    this.mesaForm.valueChanges.subscribe((selectedValue) => {});
    const toSelect = this.estados.find((c) => c == 1);
    this.mesaForm.get('Estado_oid')!.setValue(toSelect);
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

  //#region Estado Mesa
  getEstadosMesa() {}
  //#end region
  //#region Empleado API
  addMesa(data: any) {
    this.mesaForm.addControl('Estado', new FormControl(''));
    // this.mesaForm.controls['Duenyo_oid'].setValue(this.authService.usuario.Id);
    this.mesaForm.patchValue({
      Estado: 1,
    });
    if (!this.editData) {
      if (this.mesaForm.valid) {
        this.apiMesaService.add(this.mesaForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Mesa creada!',
              showConfirmButton: false,
              timer: 3500,
            });
            this.mesaForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              heightAuto: false,
              title: 'Error al agregar una mesa',
            });
          },
        });
      }
    } else {
      this.updateMesa(this.mesaForm.value.id, this.mesaForm.value);
    }
  }
  updateMesa(id: string, data: any) {
    this.apiMesaService.update('idMesa', id, data).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Mesa editado!',
          showConfirmButton: false,
          timer: 3500,
        });
        this.mesaForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        alert('Error al momento de editar un Mesa');
      },
    });
  }
  getMesas() {
    return this.apiMesaService.getList();
  }
  //#endregion
}
