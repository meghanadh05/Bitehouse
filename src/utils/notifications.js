import { loadFromStorage, saveToStorage } from './storage.js';

const NOTIFICATION_KEY = 'freshbasket_notifications';

export function getNotificationRequests() {
  return loadFromStorage(NOTIFICATION_KEY, []);
}

export function hasNotificationRequest(productId, phone) {
  return getNotificationRequests().some(
    (request) => request.productId === productId && request.phone === phone.trim()
  );
}

export function hasAnyNotificationForProduct(productId) {
  return getNotificationRequests().some((request) => request.productId === productId);
}

export function saveNotificationRequest(request) {
  const requests = getNotificationRequests();
  if (hasNotificationRequest(request.productId, request.phone)) {
    return { saved: false, duplicate: true };
  }

  saveToStorage(NOTIFICATION_KEY, [...requests, request]);
  return { saved: true, duplicate: false };
}
