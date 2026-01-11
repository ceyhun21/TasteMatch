import React, { useState } from 'react';
import { Review } from '@types/index';
import { Star, Heart, MessageCircle, Upload } from 'react-icons/fa';

interface ReviewListProps {
  restaurantId: string;
  reviews: Review[];
  onAddReview?: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ restaurantId, reviews, onAddReview }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    text: '',
    images: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddReview) {
      onAddReview({
        restaurantId,
        userId: 'current-user-id', // Get from auth
        userName: 'Anonymous User',
        rating: formData.rating,
        text: formData.text,
        images: formData.images,
      });
      setFormData({ rating: 5, text: '', images: [] });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Bewertungen & Kommentare</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary px-4 py-2"
        >
          {showForm ? 'Abbrechen' : 'Bewertung hinterlassen'}
        </button>
      </div>

      {showForm && (
        <div className="card border-2 border-blue-500">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Bewertung</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`text-2xl ${
                      star <= formData.rating ? 'text-yellow-500' : 'text-slate-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2">Deine Bewertung</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Wie war dein Erlebnis? Besondere Allergie-Hinweise?"
                className="input h-32 resize-none"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <Upload size={18} />
                Fotos hinzufügen
              </label>
              <input type="file" multiple accept="image/*" className="input" />
              <p className="text-xs text-slate-500 mt-1">
                Fotos von deinem Gericht helfen anderen Nutzern!
              </p>
            </div>

            <button type="submit" className="w-full btn-primary">
              Bewertung veröffentlichen
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-slate-500 py-8">
            Noch keine Bewertungen. Sei der erste!
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="card border-l-4 border-yellow-500">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                    {review.userAvatar ? (
                      <img src={review.userAvatar} alt={review.userName} className="w-full h-full rounded-full" />
                    ) : (
                      <span className="text-sm font-bold">{review.userName.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{review.userName}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(review.createdAt).toLocaleDateString('de-DE')}
                </span>
              </div>

              <p className="text-slate-700 mb-3">{review.text}</p>

              {review.images && review.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                  {review.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Review ${idx}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              {review.allergyRelevant && Object.keys(review.allergyRelevant).length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded p-3 mb-3">
                  <p className="text-xs font-semibold text-orange-900 mb-2">
                    🔔 Allergie-Informationen:
                  </p>
                  {Object.entries(review.allergyRelevant).map(([allergy, comment]) => (
                    <p key={allergy} className="text-xs text-orange-800">
                      <strong>{allergy}:</strong> {comment}
                    </p>
                  ))}
                </div>
              )}

              <div className="flex gap-4 text-sm text-slate-500">
                <button className="flex items-center gap-1 hover:text-red-500">
                  <Heart size={16} />
                  Hilfreich ({review.helpful})
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500">
                  <MessageCircle size={16} />
                  Antworten
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewList;
