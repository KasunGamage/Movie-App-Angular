import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
@NgModule({
  declarations: [ConfirmComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [ConfirmComponent],
  exports: [
    ConfirmComponent
  ],
})
export class ComponentSharedModule {}
