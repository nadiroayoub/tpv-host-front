import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
<<<<<<< HEAD

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

=======
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

registerLicense(
  'ORg4AJUWIOA/Gnt2WhhQlFac113W3RNYVF2R2FJe1rZdF9DZkwgoxidQ19hsxtTcEVhWndceXFdQmY='
);
>>>>>>> main
if (environment.production) {
  enableProdMode();
}

<<<<<<< HEAD
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
=======
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
>>>>>>> main
