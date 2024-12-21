const {
  HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField
} = foundry.data.fields;

class InvestigatorData extends foundry.abstract.TypeDataModel {
  //
  /** Returns a schema of all necessary parts of an investigator **/
  static defineSchema() {
    return {
      biography: new HTMLField(),
      name: new HTMLField(),
      dicePool: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
        min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 6 })
      }),
      dicePoolLimit: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
        min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 6 })
      }),
      dicePoolMax: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
        min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 6 })
      }),
      profile: new FilePathField({ required: false, categories: ["IMAGE"] }),

      // Skills
      agility: new NumberField({ required: true, integer: true, min: 2, max: 6, initial: 5 }),
      athletics: new NumberField({ required: true, integer: true, min: 2, max: 6, initial: 5 }),
      wits: new NumberField({ required: true, integer: true, min: 2, max: 6, initial: 5 }),
      presence: new NumberField({ required: true, integer: true, min: 2, max: 6, initial: 5 }),
      intuition: new NumberField({ required: true, integer: true, min: 2, max: 6, initial: 5 }),
      knowledge: new NumberField({ required: true, integer: true, min: 2, max: 6, initial: 5 }),
      resolve: new NumberField({ required: true, integer: true, min: 2, max: 6, initial: 5 }),
      meleeCombat: new NumberField({ required: true, integer: true, min: 2, max: 6, initial: 5 }),
      rangedCombat: new NumberField({ required: true, integer: true, min: 2, max: 6, initial: 5 }),
      lore: new NumberField({ required: true, integer: true, min: 2, max: 6, initial: 5 }),
    };
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    // Make sure we the dicePoolLimit is at most the dicePoolMaximum
    this.dicePoolLimit.value = Math.min(this.dicePoolLimit.value, this.dicePoolMax.value)
  }

}

Hooks.on("init", () => {
  CONFIG.Actor.dataModels.investigator = InvestigatorData;
  CONFIG.Actor.trackableAttributes = {
    investigator: {
      bar: ['dicePool'],
    }
  }
});
