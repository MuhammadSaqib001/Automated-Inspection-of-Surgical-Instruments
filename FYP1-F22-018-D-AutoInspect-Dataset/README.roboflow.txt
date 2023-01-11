
Defect_Detection - v9 2023-01-07 2:33am
==============================

This final dataset was exported via roboflow.com on January 1, 2023 at 9:36 PM GMT

Roboflow is an end-to-end computer vision platform that helps you
* collaborate with your team on computer vision projects
* collect & organize images
* understand unstructured image data
* annotate, and create datasets
* export, train, and deploy computer vision models
* use active learning to improve your dataset over time

It includes 1994 images.
Defects are annotated in YOLO v5 PyTorch format.

The following pre-processing was applied to each image:
* Auto-orientation of pixel data (with EXIF-orientation stripping)
* Resize to 180x180 (Stretch)

The following augmentation was applied to create 3 versions of each source image:
* 50% probability of horizontal flip
* 50% probability of vertical flip
* Equal probability of one of the following 90-degree rotations: none, clockwise, counter-clockwise, upside-down
* Random rotation of between -5 and +5 degrees
* Random brigthness adjustment of between -6 and +6 percent
* Random exposure adjustment of between -5 and +5 percent

The following transformations were applied to the bounding boxes of each image:
* Random exposure adjustment of between -5 and +5 percent
* Random brigthness adjustment of between -6 and +6 percent
* Random Gaussian blur of between 0 and 0.5 pixels
* Salt and pepper noise was applied to 1 percent of pixels