export const ID_TYPES = {
  WORKOUT: "workout",
  EXERCISE: "exercise",
  DAY: "day",
} as const;

class GenerateId {
  private static instance: GenerateId;
  private counters: Map<string, number>;

  private constructor() {
    this.counters = new Map();
    Object.values(ID_TYPES).forEach((type) => {
      this.counters.set(type, 0);
    });
  }

  public static getInstance(): GenerateId {
    if (!GenerateId.instance) {
      GenerateId.instance = new GenerateId();
    }
    return GenerateId.instance;
  }

  // Tạo ID mới với prefix
  public generate(type: keyof typeof ID_TYPES): string {
    const counter = this.counters.get(type) || 0;
    this.counters.set(type, counter + 1);

    return `${type}_${counter}`;
  }

  // Kiểm tra xem ID có hợp lệ không
  public isValidId(id: string, type: keyof typeof ID_TYPES): boolean {
    return id.startsWith(`${type}_`);
  }

  // Reset counter cho testing
  public reset(): void {
    this.counters.clear();
    Object.values(ID_TYPES).forEach((type) => {
      this.counters.set(type, 0);
    });
  }
}

export const generateId = GenerateId.getInstance();
