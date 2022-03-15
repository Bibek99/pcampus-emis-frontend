import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';

export let avatarSVG = (seed: string) =>
  createAvatar(style, {
    seed,
    dataUri: true,
  });
