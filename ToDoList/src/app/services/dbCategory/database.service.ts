import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
import { LoggerService } from '../logger/logger.service';
import { ICategoryDTO } from 'src/app/model/dto/IcategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceCategory {
  private _storage: Storage | null = null;
  private storageObservable$ = new Subject<ICategoryDTO[]>();
  private readonly keyDb: string = "category" as const;

  constructor(private storage: Storage, private logger: LoggerService) {
    this.init();
  }

  public async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.logger.log("[DatabaseService]", "Ionic Storage inicializado.")
  }

  public async getCategory(): Promise<ICategoryDTO[]> {
    try {
      const data = await this._storage?.get(this.keyDb);
      const dataFilter = data?.filter((s: ICategoryDTO) => s.is_delete == false);
      return dataFilter ?? [];
    } catch (err) {
      throw err;
    }
  }

  private async updateCategory(data: ICategoryDTO[]) {
    await this.storage.set(this.keyDb, data);
  }

  public async updteCategoryForId(id: string, value: string) {

    try {

      if(id === null || id === "") throw new Error("no se encontro el id correspondiente.");

      const data = (await this.getCategory()).map(s => {
        return (s.id === id ? { ...s, name: value } : s)
      });
      await this.updateCategory(data);
      await this.storageObserver();
    } catch (err) {
      throw err;
    }
  }

   public async insertCategory(modeldto: ICategoryDTO) {
    try {

      if (modeldto === null) throw new Error("modelo incorrecto al enviar.");

      const validatorUniqueTask = (await this.getCategory()).
        some(s => s.name.trim().toLocaleLowerCase() == modeldto.name.trim().toLocaleLowerCase());

      if (validatorUniqueTask) throw new Error("Categoria ya existente");

      const data = await this.getCategory();
      data.push(modeldto);
      await this._storage?.set(this.keyDb, data);
      await this.storageObserver();
    } catch (err) {
      throw err;
    }
  }

  public async deleteCategory(id: string) {

    if (id === null || id === "") throw new Error("no se encontro el id correspondiente.");
    try {
      const data = (await this.getCategory()).map((s: ICategoryDTO) => {
        if (s.id == id) {
          s.is_delete = true;
        }
        return s;
      });
      await this.updateCategory(data);
      await this.storageObserver();
    } catch (err) {
      throw err;
    }
  }

  private async storageObserver() {
    const data = await this.getCategory();
    this.storageObservable$.next(data);
  }

  public storageListening() {
    return this.storageObservable$.asObservable();
  }
}
