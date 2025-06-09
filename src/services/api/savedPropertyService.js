const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SavedPropertyService {
  constructor() {
    // Load from localStorage if available
    const saved = localStorage.getItem('savedProperties');
    this.savedProperties = saved ? JSON.parse(saved) : [];
  }

  _persist() {
    localStorage.setItem('savedProperties', JSON.stringify(this.savedProperties));
  }

  async getAll() {
    await delay(200);
    return [...this.savedProperties];
  }

  async getById(id) {
    await delay(150);
    const saved = this.savedProperties.find(s => s.id === id);
    return saved ? { ...saved } : null;
  }

  async create(savedProperty) {
    await delay(250);
    
    // Check if already saved
    const existing = this.savedProperties.find(s => s.propertyId === savedProperty.propertyId);
    if (existing) {
      return { ...existing };
    }

    const newSaved = {
      ...savedProperty,
      id: Date.now().toString(),
      savedDate: savedProperty.savedDate || new Date().toISOString()
    };
    
    this.savedProperties.push(newSaved);
    this._persist();
    return { ...newSaved };
  }

  async update(id, data) {
    await delay(200);
    const index = this.savedProperties.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    this.savedProperties[index] = { ...this.savedProperties[index], ...data };
    this._persist();
    return { ...this.savedProperties[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.savedProperties.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    this.savedProperties.splice(index, 1);
    this._persist();
    return true;
  }

  async removeByPropertyId(propertyId) {
    await delay(200);
    const index = this.savedProperties.findIndex(s => s.propertyId === propertyId);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    this.savedProperties.splice(index, 1);
    this._persist();
    return true;
  }
}

export const savedPropertyService = new SavedPropertyService();