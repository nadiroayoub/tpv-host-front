import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  FormControl,
} from '@angular/forms';
import { ApiEmployeeService } from '../../services/apiEmployee/api-employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Negocio } from 'src/app/shared/models/Negocio';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { CommonServiceService } from '../../services/commonService/common-service.service';

@Component({
  selector: 'app-dialog-empleado',
  templateUrl: './dialog-empleado.component.html',
  styleUrls: ['./dialog-empleado.component.scss'],
})
export class DialogEmpleadoComponent implements OnInit {
  empleadoForm!: FormGroup;
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
    private apiEmployeeService: ApiEmployeeService,
    private apiNegocioService: ApiNegocioService,
    private dialogRef: MatDialogRef<DialogEmpleadoComponent>,
    private commonService: CommonServiceService
  ) {}

  ngOnInit(): void {
    this.empleadoForm = this.formBuilder.group(
      {
        id: [''],
        dni: ['', [Validators.required, Validators.pattern(this.nifNieRegex)]],
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        telefono: [''],
        email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
        pass: [
          null,
          [
            (c: AbstractControl) => Validators.required(c),
            Validators.pattern(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            ),
          ],
        ],
        duplicatePass: [
          null,
          [
            (c: AbstractControl) => Validators.required(c),
            Validators.pattern(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            ),
          ],
        ],
        Negocio_oid: ['', Validators.required],
      },
      {
        validators: this.MustMatch('pass', 'duplicatePass'),
      }
    );
    if (this.editData) {
      this.titleAccion = this.btnAccion = 'Editar';
      this.empleadoForm.controls['id'].setValue(this.editData.Id);
      this.empleadoForm.controls['dni'].setValue(this.editData.Dni);
      this.empleadoForm.controls['nombre'].setValue(this.editData.Nombre);
      this.empleadoForm.controls['apellidos'].setValue(this.editData.Apellidos);
      this.empleadoForm.controls['telefono'].setValue(this.editData.Telefono);
      this.empleadoForm.controls['email'].setValue(this.editData.Email);
      this.empleadoForm.controls['Negocio_oid'].setValue(
        this.editData.NegocioEmpleado.Id
      );
    }
    this.getNegocios();
    this.empleadoForm.valueChanges.subscribe((selectedValue) => {});
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
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

  //#region Empleado API
  addEmpleado(data: any) {
    this.empleadoForm.addControl(
      'Foto',
      new FormControl('')
    );
    this.empleadoForm.patchValue({
      Foto: '',
    });
    if (!this.editData) {
      if (this.empleadoForm.valid) {
        this.apiEmployeeService.add(this.empleadoForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Empleado creado',
              showConfirmButton: false,
              timer: 3500,
              heightAuto: false,
            });

            this.empleadoForm.reset();
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
      this.updateEmpleado(this.empleadoForm.value.id, this.empleadoForm.value);
    }
    this.sendMessage();
  }
  sendMessage() {
    this.commonService.sendUpdate('Refresh');
  }
  updateEmpleado(id: string, data: any) {
    this.apiEmployeeService.update('idEmpleado', id, data).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Empleado editado!',
          showConfirmButton: false,
          timer: 3500,
          heightAuto: false,
        });
        this.empleadoForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          heightAuto: false,
          title: 'Correo electronico o DNI ya existen',
        });
      },
    });
    this.sendMessage();
  }
  getEmpleados() {
    return this.apiEmployeeService.getList();
    this.sendMessage();
  }
  //#endregion
}
