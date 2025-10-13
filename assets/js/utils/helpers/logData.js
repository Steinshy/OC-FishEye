export const logData = {
  formSubmission(formData) {
    console.info('Form submission data:', {
      firstname: formData.firstname || '',
      lastname: formData.lastname || '',
      email: formData.email || '',
      message: formData.message || '',
    });
  },

  photographer(photographer) {
    console.info('Photographer loaded:', {
      id: photographer.id,
      name: photographer.name,
      city: photographer.city,
      country: photographer.country,
      tagline: photographer.tagline,
      price: photographer.price,
    });
  },

  photographerMedia(media) {
    console.info('Photographer media:', {
      id: media.id,
      photographerId: media.photographerId,
      title: media.title,
      image: media.image,
      video: media.video,
      likes: media.likes,
      date: media.date,
      price: media.price,
    });
  },

  photographerMedias(medias, photographerId) {
    console.info(`Photographer ${photographerId} has loaded medias (${medias.length} items):`, medias);
  },

  custom(label, data) {
    console.info(`${label}:`, data);
  },
};
