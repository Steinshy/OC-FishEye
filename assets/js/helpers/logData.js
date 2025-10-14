// Console logging utilities for debugging

export const logData = {
  // Log form submission data
  formSubmission(data) {
    console.info('Form submission data:', {
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      email: data.email || '',
      message: data.message || '',
    });
  },

  // Log photographer information
  photographer(info) {
    console.info('Photographer loaded:', {
      id: info.id,
      name: info.name,
      city: info.city,
      country: info.country,
      tagline: info.tagline,
      price: info.price,
    });
  },

  // Log single media item
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

  // Log all photographer medias
  photographerMedias(medias, id, name) {
    console.info(`The photographer with id ${id} has been loaded. \n ${name} has ${medias.length} medias in total:`, medias);
  },

  // Log custom data with label
  custom(label, data) {
    console.info(`${label}:`, data);
  },
};
