export const trackNonHotLinkedPhotoView = ({ appId }: { appId: string }) => ({
  photoId,
}: {
  photoId: string | string[];
}) => {
  const ids = !Array.isArray(photoId) ? [photoId] : photoId;

  if (ids.length > 20) {
    throw new Error(
      'You cannot track more than 20 photos at once. Please try again with fewer photos.',
    );
  }

  return fetch(`views.unsplash.com/v?photo_id=${ids.join()}&app_id=${appId}`);
};
