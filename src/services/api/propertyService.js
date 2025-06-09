import propertyData from '../mockData/properties.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PropertyService {
  constructor() {
    this.properties = [...propertyData];
  }

  async getAll() {
    await delay(300);
    return [...this.properties];
  }

  async getById(id) {
    await delay(200);
    const property = this.properties.find(p => p.id === id);
    return property ? { ...property } : null;
  }

  async create(property) {
    await delay(250);
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      listingDate: new Date().toISOString()
    };
    this.properties.push(newProperty);
    return { ...newProperty };
  }

  async update(id, data) {
    await delay(250);
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    this.properties[index] = { ...this.properties[index], ...data };
    return { ...this.properties[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    this.properties.splice(index, 1);
    return true;
  }
}

export const propertyService = new PropertyService();