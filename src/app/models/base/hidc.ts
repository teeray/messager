export class HIDC {
    id: number;
    isDeleted: boolean;
    isDisabled: boolean;
    created: Date;
    lastUpdated: Date;
    rowVersion: string;
    constructor(obj: HIDC = {} as HIDC) {
      const {
        id = 0,
        isDeleted = false,
        isDisabled = false,
        created = new Date(),
        lastUpdated = new Date(),
        rowVersion = ''
        } = obj;
      this.id = id;
      this.isDeleted = isDeleted;
      this.isDisabled = isDisabled;
      this.created = new Date(created);
      this.lastUpdated = new Date(lastUpdated);
      this.rowVersion = rowVersion;
    }
    update(obj: HIDC = {} as HIDC, setAll: boolean = false) {
      const {
        id = 0,
        isDeleted = false,
        isDisabled = false,
        created = new Date(),
        lastUpdated = new Date(),
        rowVersion = ''
        } = obj;
      this.id = id;
      this.created = new Date(created);
      this.lastUpdated = new Date(lastUpdated);
      this.rowVersion = rowVersion;
    }
  }