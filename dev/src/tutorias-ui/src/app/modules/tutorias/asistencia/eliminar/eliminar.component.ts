import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TutoriasService } from '../../../../shared/services/tutorias.service';
import { AsistenciaTutoria } from '../../../../shared/entities/tutoria';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss']
})
export class EliminarComponent {

  constructor(public dialogRef: MatDialogRef<EliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AsistenciaTutoria,
    private service: TutoriasService) { }

  eliminar_asistencia() {
    this.service.eliminarAsistencia(this.data.id).subscribe( b => {
      this.dialogRef.close(b);
    })
  }

}
