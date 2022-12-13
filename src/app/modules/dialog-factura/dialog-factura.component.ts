import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiClienteService } from 'src/app/services/apiCliente/api-cliente.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { Negocio } from 'src/app/shared/models/Negocio';
import Swal from 'sweetalert2';
import { DialogEmpleadoComponent } from '../dialog-empleado/dialog-empleado.component';
import { ApiFacturaService } from '../../services/apiFactura/api-factura.service';
import { Cliente } from 'src/app/shared/models/Cliente';

@Component({
  selector: 'app-dialog-factura',
  templateUrl: './dialog-factura.component.html',
  styleUrls: ['./dialog-factura.component.scss'],
})
export class DialogFacturaComponent implements OnInit {
  facturaForm!: FormGroup;
  btnAccion: string = 'Guardar';
  clientes!: Cliente[];
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  hide = true;
  hideConfirmPassword = true;
  titleAccion: string = 'Agregar';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiFacturaService: ApiFacturaService,
    private apiNegocioService: ApiNegocioService,
    private apiClienteService: ApiClienteService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<DialogEmpleadoComponent>
  ) {}

  ngOnInit(): void {
    this.facturaForm = this.formBuilder.group({
      id: [''],
      numero: ['', [Validators.required, Validators.pattern(this.nifNieRegex)]],
      fecha: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      Cliente_oid: ['', Validators.required],
    });
    if (this.editData) {
      this.titleAccion = this.btnAccion = 'Editar';
      console.log(this.editData);
      this.facturaForm.controls['id'].setValue(this.editData.Id);
      this.facturaForm.controls['numero'].setValue(this.editData.numero);
      this.facturaForm.controls['fecha'].setValue(this.editData.fecha);
      this.facturaForm.controls['precio'].setValue(this.editData.precio);
      this.facturaForm.controls['descripcion'].setValue(
        this.editData.descripcion
      );
      this.facturaForm.controls['Cliente_oid'].setValue(
        this.editData.Cliente.Id
      );
    }
    this.getNegocios();
    this.facturaForm.valueChanges.subscribe((selectedValue) => {
      console.log(this.facturaForm.valid);
    });
  }

  //#region Negocios API
  getNegocios() {
    this.apiClienteService.getList().subscribe({
      next: (res) => {
        this.clientes = res;
      },
      error: (err) => {
        alert('Error while fetching Cliente:/Cliente/ReadAll records!');
      },
    });
  }
  //#endregion
  //#region Factura API
  addFactura(data: any) {
    if (!this.editData) {
      if (this.facturaForm.valid) {
        this.apiFacturaService.add(this.facturaForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Factura creada!',
              showConfirmButton: false,
              timer: 3500,
            });
            this.facturaForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              heightAuto: false,
              title: 'Error a agregar una factura',
            });
          },
        });
      }
    } else {
      this.updateFactura(this.facturaForm.value.id, this.facturaForm.value);
    }
  }
  updateFactura(id: string, data: any) {
    this.apiFacturaService.update('idFactura', id, data).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Factura editado!',
          showConfirmButton: false,
          timer: 3500,
        });
        this.facturaForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        alert('Error al momento de editar un Factura');
      },
    });
  }
  getFacturas() {
    return this.apiFacturaService.getList();
  }
  //#endregion
}
