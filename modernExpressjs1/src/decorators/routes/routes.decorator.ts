import { MetadataKeys } from '../../utils/metadata.keys';
export const Controller =
  (basePath: string): ClassDecorator =>
  (target) =>
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
