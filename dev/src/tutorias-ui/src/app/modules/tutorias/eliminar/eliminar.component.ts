import { Component, OnInit, Inject } from '@angular/core';


import { TutoriasService } from '../../../shared/services/tutorias.service';
import { Tutoria } from '../../../shared/entities/tutoria';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss']
})
export class EliminarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tutoria,
    private service: TutoriasService) { }

  eliminar() {
    this.service.eliminarTutoria(this.data.id).subscribe( b => {
      this.dialogRef.close(b);
    })
  }

  ngOnInit() {
  }

}
