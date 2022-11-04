import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControlName,
  FormControl,
} from '@angular/forms';
import { ApiNegocioService } from '../../services/apiNegocio/api-negocio.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-negocio',
  templateUrl: './dialog-negocio.component.html',
  styleUrls: ['./dialog-negocio.component.scss'],
})
export class DialogNegocioComponent implements OnInit {
  negocioForm!: FormGroup;
  btnAccion: string = 'Guardar';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiNegocioService: ApiNegocioService,
    private dialogRef: MatDialogRef<DialogNegocioComponent>
  ) {}

  ngOnInit(): void {
    this.negocioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      cp: [''],
      provincia: [''],
      pais: [''],
    });
    console.log(this.editData);
    if (this.editData) {
      this.btnAccion = 'Editar';
      this.negocioForm.controls['nombre'].setValue(this.editData.Nombre);
      this.negocioForm.controls['direccion'].setValue(this.editData.Direccion);
    }
  }
  addNegocio(data: any) {
    // this.negocioForm.addControl(
    //   'Foto',
    //   new FormControl('', Validators.required)
    // );
    this.negocioForm.addControl(
      'Empresa_oid',
      new FormControl(65536, Validators.required)
    );
    // this.negocioForm.removeControl('rol');
    // this.negocioForm.removeControl('lugar');
    this.negocioForm.patchValue({
      Empresa_oid: 65536,
    });
    if (!this.editData) {
      if (this.negocioForm.valid) {
        this.apiNegocioService.add(this.negocioForm.value).subscribe({
          next: (res) => {
            console.log('Negocio agregado');
            this.negocioForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: () => {
            alert('Error al momento de agregar un nuevo Negocio');
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
}
