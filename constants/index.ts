export const blizzardLink = 'https://www.blizzard.com/'
export const discordData =
  'https://discord.com/api/v9/invites/GSu6zkNvx5?with_counts=true&with_expiration=false'

export const discordJoinLink = 'https://discord.com/invite/GSu6zkNvx5'

export const githubReadMeLink =
  'https://github.com/melisa-abuin/rkr-w3/blob/main/README.md'

export const routes = {
  home: {
    label: 'Home',
    url: '/',
  },
  howToPlay: {
    label: 'How To Play',
    url: '/how-to-play',
  },
  download: {
    label: 'Download v4.3.4',
    url: 'https://www.epicwar.com/maps/339864/',
  },
}

export const tricks = [
  {
    alt: 'Dog trick button',
    icon: 'paw-heart',
    text: 'If someone saves you and you are inside a dog, you can move through him without dying. This way you can overcome dog walls or take a path blocked for the one who saved you.',
    videoUrl: '/save.mp4',
  },
  {
    alt: 'Group trick button',
    icon: 'two-users',
    text: 'In order to control two different kitties at the same time you must set up 3 control groups. Select your Kitty and press crtl+1, select the other Kitty and press ctrl+2 and now select your Kitty and press shift while you select the other kitty to select both kitties at the same time and finally press ctrl+3 with both kitties selected.',
    videoUrl: '/control-two-kitties.mp4',
  },
  {
    alt: 'Camera angle trick button',
    icon: 'camera-angle',
    text: 'Find out what keys change the camera angle, this is useful for hard saves with almost no visibility.',
    videoUrl: '/camera-angle.mp4',
  },
  {
    alt: 'Center camera trick button',
    icon: 'camera-center',
    text: 'Press F1 or spacebar to center the camera in your Kitty.',
    videoUrl: '/center-camera.mp4',
  },
] as const
