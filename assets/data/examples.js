const NOISEASIER_DATA = {
  gallery: [
    { after: 'videos/gallery/VBench/sunrise_after.mp4', before: 'videos/gallery/VBench/sunrise_before.mp4' },
    { after: 'videos/gallery/VBench/turtle_swim_after.mp4', before: 'videos/gallery/VBench/turtle_swim_before.mp4' },
    { after: 'videos/gallery/VBench/panda_after.mp4', before: 'videos/gallery/VBench/panda_before.mp4' },
    { after: 'videos/gallery/VBench/Van_Gogh_after.mp4', before: 'videos/gallery/VBench/Van_Gogh_before.mp4' },
    { after: 'videos/gallery/VBench/Iron_Man_after.mp4', before: 'videos/gallery/VBench/Iron_Man_before.mp4' },
    { after: 'videos/gallery/VBench/tornado_after.mp4', before: 'videos/gallery/VBench/tornado_before.mp4' },
    { after: 'videos/gallery/VBench/cat_sunglasses_after.mp4', before: 'videos/gallery/VBench/cat_sunglasses_before.mp4' },
    { after: 'videos/gallery/CompBench/consist_attr_0009_after.mp4', before: 'videos/gallery/CompBench/consist_attr_0009_before.mp4' },
    { after: 'videos/gallery/CompBench/spatial_0124_after.mp4', before: 'videos/gallery/CompBench/spatial_0124_before.mp4' },
    { after: 'videos/gallery/CompBench/action_0121_after.mp4', before: 'videos/gallery/CompBench/action_0121_before.mp4' },
    { after: 'videos/gallery/CompBench/interaction_0042_after.mp4', before: 'videos/gallery/CompBench/interaction_0042_before.mp4' },
    { after: 'videos/gallery/CompBench/consist_attr_0005_after.mp4', before: 'videos/gallery/CompBench/consist_attr_0005_before.mp4' },
    { after: 'videos/gallery/CompBench/numeracy_0117_after.mp4', before: 'videos/gallery/CompBench/numeracy_0117_before.mp4' },
    { after: 'videos/gallery/CompBench/spatial_0079_after.mp4', before: 'videos/gallery/CompBench/spatial_0079_before.mp4' },
    { after: 'videos/gallery/CompBench/consist_attr_0049_after.mp4', before: 'videos/gallery/CompBench/consist_attr_0049_before.mp4' },
    { after: 'videos/gallery/CompBench/interaction_0195_after.mp4', before: 'videos/gallery/CompBench/interaction_0195_before.mp4' }
  ],
  groups: [
    {
      benchmark: 'compbench',
      model: 'T2V-Turbo (VC2)',
      aspectRatio: '8 / 5',
      samples: [
        ['Orange cat sleeping on a purple cushion.', 'videos/VC2/CompBench/consist_attr_0008_before.mp4', 'videos/VC2/CompBench/consist_attr_0008_after.mp4'],
        ['A timelapse of a leaf transitioning from green to bright red as autumn progresses.', 'videos/VC2/CompBench/dynamic_attr_0001_before.mp4', 'videos/VC2/CompBench/dynamic_attr_0001_after.mp4'],
        ['A dog running on the left of a bicycle.', 'videos/VC2/CompBench/spatial_0001_before.mp4', 'videos/VC2/CompBench/spatial_0001_after.mp4'],
        ['A red balloon gradually descending in the sky.', 'videos/VC2/CompBench/motion_0073_before.mp4', 'videos/VC2/CompBench/motion_0073_after.mp4'],
        ['A musician is strumming a guitar on stage, while a dancer is twirling gracefully under the spotlight.', 'videos/VC2/CompBench/action_0127_before.mp4', 'videos/VC2/CompBench/action_0127_after.mp4'],
        ['Mage conjures fireball in palm, controlling the flames.', 'videos/VC2/CompBench/interaction_0043_before.mp4', 'videos/VC2/CompBench/interaction_0043_after.mp4'],
        ['Five robots dance rhythmically in the lab.', 'videos/VC2/CompBench/numeracy_114_before.mp4', 'videos/VC2/CompBench/numeracy_114_after.mp4']
      ]
    },
    {
      benchmark: 'compbench',
      model: 'T2V-Turbo (MS)',
      aspectRatio: '1 / 1',
      samples: [
        ['Purple balloon floating near a yellow car.', 'videos/MS/CompBench/consist_attr_098_before.mp4', 'videos/MS/CompBench/consist_attr_098_after.mp4'],
        ['A timelapse of a flower bud blooming into a full flower.', 'videos/MS/CompBench/dynamic_atrr_0004_before.mp4', 'videos/MS/CompBench/dynamic_atrr_0004_after.mp4'],
        ['A cat sitting behind a cake.', 'videos/MS/CompBench/spatial_0072_before.mp4', 'videos/MS/CompBench/spatial_0072_after.mp4'],
        ['A fish swims from right to left in the sea.', 'videos/MS/CompBench/motion_0044_before.mp4', 'videos/MS/CompBench/motion_0044_after.mp4'],
        ['A person rides a bicycle, a rabbit hops alongside the path.', 'videos/MS/CompBench/action_0054_before.mp4', 'videos/MS/CompBench/action_0054_after.mp4'],
        ['A child jumping onto a trampoline, compressing the surface and bouncing back into the air.', 'videos/MS/CompBench/interaction_0117_before.mp4', 'videos/MS/CompBench/interaction_0117_after.mp4'],
        ['Five oranges roll across the table.', 'videos/MS/CompBench/numeracy_0115_before.mp4', 'videos/MS/CompBench/numeracy_0115_after.mp4']
      ]
    },
    {
      benchmark: 'compbench',
      model: 'AnimateLCM',
      aspectRatio: '1 / 1',
      isNew: true,
      samples: [
        ['A blue car drives past a white picket fence on a sunny day.', 'videos/animatelcm/CompBench/consist_attr_0001_before.mp4', 'videos/animatelcm/CompBench/consist_attr_0001_after.mp4'],
        ['Velvet ribbon tied on an iron fence.', 'videos/animatelcm/CompBench/consist_attr_0044_before.mp4', 'videos/animatelcm/CompBench/consist_attr_0044_after.mp4'],
        ['A father pushes his daughter on a swing.', 'videos/animatelcm/CompBench/interaction_0198_before.mp4', 'videos/animatelcm/CompBench/interaction_0198_after.mp4'],
        ['A man fixes a bike, a dog sits beside.', 'videos/animatelcm/CompBench/action_0068_before.mp4', 'videos/animatelcm/CompBench/action_0068_after.mp4'],
        ['A firefighter sprays a jet of water at a burning structure, causing the flames to waver and shrink.', 'videos/animatelcm/CompBench/interaction_0112_before.mp4', 'videos/animatelcm/CompBench/interaction_0112_after.mp4'],
        ['A dog wears sunglasses while a cat wears a superhero cape.', 'videos/animatelcm/CompBench/action_0195_before.mp4', 'videos/animatelcm/CompBench/action_0195_after.mp4'],
        ['An elephant standing on the left of a rowboat in a small pond.', 'videos/animatelcm/CompBench/spatial_0012_before.mp4', 'videos/animatelcm/CompBench/spatial_0012_after.mp4'],
        ['Five cups sit on a table, steaming with fresh coffee.', 'videos/animatelcm/CompBench/numeracy_0125_before.mp4', 'videos/animatelcm/CompBench/numeracy_0125_after.mp4']
      ]
    },
    {
      benchmark: 'vbench',
      model: 'T2V-Turbo (VC2)',
      aspectRatio: '8 / 5',
      samples: [
        ["A corgi's head depicted as an explosion of a nebula.", 'videos/VC2/VBench/001-before.mp4', 'videos/VC2/VBench/001-after.mp4'],
        ['An astronaut flying in space.', 'videos/VC2/VBench/002-before.mp4', 'videos/VC2/VBench/002-after.mp4'],
        ['A motorcycle gliding through a snowy field.', 'videos/VC2/VBench/003-before.mp4', 'videos/VC2/VBench/003-after.mp4'],
        ['A teddy bear and a frisbee.', 'videos/VC2/VBench/004-before.mp4', 'videos/VC2/VBench/004-after.mp4'],
        ['A pink bird.', 'videos/VC2/VBench/005-before.mp4', 'videos/VC2/VBench/005-after.mp4'],
        ['Broccoli on the top of a banana, front view.', 'videos/VC2/VBench/006-before.mp4', 'videos/VC2/VBench/006-after.mp4']
      ]
    },
    {
      benchmark: 'vbench',
      model: 'T2V-Turbo (MS)',
      aspectRatio: '1 / 1',
      samples: [
        ['A panda standing on a surfboard in the ocean at sunset.', 'videos/MS/VBench/panda_before.mp4', 'videos/MS/VBench/panda_after.mp4'],
        ['A yellow cat.', 'videos/MS/VBench/cat_before.mp4', 'videos/MS/VBench/cat_after.mp4'],
        ['A zebra and a giraffe.', 'videos/MS/VBench/zebra_before.mp4', 'videos/MS/VBench/zebra_after.mp4'],
        ['A bicycle on the left of a car, front view.', 'videos/MS/VBench/bicycle_before.mp4', 'videos/MS/VBench/bicycle_after.mp4'],
        ['A person swimming in the ocean.', 'videos/MS/VBench/swimming_before.mp4', 'videos/MS/VBench/swimming_after.mp4'],
        ['A person playing guitar.', 'videos/MS/VBench/play_guitar_before.mp4', 'videos/MS/VBench/play_guitar_after.mp4']
      ]
    },
    {
      benchmark: 'vbench',
      model: 'AnimateLCM',
      aspectRatio: '1 / 1',
      isNew: true,
      samples: [
        ['Vampire makeup on the face of a beautiful girl with red contact lenses.', 'videos/animatelcm/VBench/vampire_before.mp4', 'videos/animatelcm/VBench/vampire_after.mp4'],
        ['Origami dancers in white paper, 3D render, on a white background, studio shot, dancing modern dance.', 'videos/animatelcm/VBench/paper_before.mp4', 'videos/animatelcm/VBench/paper_after.mp4'],
        ['An orange vase.', 'videos/animatelcm/VBench/vase_before.mp4', 'videos/animatelcm/VBench/vase_after.mp4'],
        ['A car and a motorcycle.', 'videos/animatelcm/VBench/car_before.mp4', 'videos/animatelcm/VBench/car_after.mp4'],
        ['A bottle on the left of a wine glass, front view.', 'videos/animatelcm/VBench/bottle_before.mp4', 'videos/animatelcm/VBench/bottle_after.mp4'],
        ['An airplane accelerating to gain speed.', 'videos/animatelcm/VBench/airplane_before.mp4', 'videos/animatelcm/VBench/airplane_after.mp4']
      ]
    }
  ]
};
