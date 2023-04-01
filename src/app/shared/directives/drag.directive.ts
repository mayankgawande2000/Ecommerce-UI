import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../models/file-handle.model';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding('style.background')
  private background = "#eee";

  constructor(private sanitizer:DomSanitizer) { }

  @HostListener("dragover",["$event"])
  public onDragOver(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave",["$event"])
  public onDragLeave(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop",["$event"])
  public onDrag(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
    let filehandle: FileHandle;
    const file = evt.dataTransfer?.files[0];
    if(file){
    const url =this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    filehandle = {file,url};
    this.files.emit(filehandle);
    }
  }


}
