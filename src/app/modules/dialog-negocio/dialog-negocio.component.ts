import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ApiNegocioService } from '../../services/apiNegocio/api-negocio.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empresa } from 'src/app/shared/models/Empresa';
import { ApiEmpresaService } from 'src/app/services/apiEmpresa/api-empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-negocio',
  templateUrl: './dialog-negocio.component.html',
  styleUrls: ['./dialog-negocio.component.scss'],
})
export class DialogNegocioComponent implements OnInit {
  negocioForm!: FormGroup;
  btnAccion: string = 'Guardar';
  empresas!: Empresa[];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiNegocioService: ApiNegocioService,
    private apiEmpresaService: ApiEmpresaService,
    private dialogRef: MatDialogRef<DialogNegocioComponent>
  ) {}

  ngOnInit(): void {
    this.negocioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      cp: ['', Validators.required],
      provincia: ['', Validators.required],
      pais: ['', Validators.required],
      Empresa_oid: ['', Validators.required],
    });
    if (this.editData) {
      this.btnAccion = 'Editar';
      this.negocioForm.controls['nombre'].setValue(this.editData.Nombre);
      this.negocioForm.controls['direccion'].setValue(this.editData.Direccion);
      this.negocioForm.controls['ciudad'].setValue(this.editData.Ciudad);
      this.negocioForm.controls['cp'].setValue(this.editData.Cp);
      this.negocioForm.controls['provincia'].setValue(this.editData.Provincia);
      this.negocioForm.controls['pais'].setValue(this.editData.Pais);
      this.negocioForm.controls['Empresa_oid'].setValue(
        this.editData.Negocio.Id
      );
    }
    this.getEmpresas();
  }

  //#region Empresa API
  getEmpresas() {
    this.apiEmpresaService.getList().subscribe({
      next: (res) => {
        this.empresas = res;
      },
      error: (err) => {
        alert('Error while fetching Empresa:/Empresa/ReadAll records!');
      },
    });
  }
  //#endregion

  //#region Negocio API
  addNegocio(data: any) {
    if (!this.editData) {
      if (this.negocioForm.valid) {
        this.apiNegocioService.add(this.negocioForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Negocio creado',
              showConfirmButton: false,
              timer: 3500,
            });
            this.negocioForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              heightAuto: false,
              title: 'No se puede crear un negocio',
            });
          },
        });
      }
    } else {
      this.updateNegocio(this.negocioForm.value.dni, this.negocioForm.value);
    }
  }
  updateNegocio(id: string, data: any) {
    this.apiNegocioService.update('idNegocio', id, data).subscribe({
      next: (res) => {
        console.log('Negocio modificado');
        this.negocioForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        alert('Error al momento de editar un nuevo Negocio');
      },
    });
  }
  getNegocio() {
    return this.apiNegocioService.getList();
  }
  //#endregion
}
