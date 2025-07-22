import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, StarHalf } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log({ rating, reviewText });
      navigate("/dashboard", { state: { reviewSubmitted: true } });
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Share Your Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Section */}
            <div className="text-center">
              <h3 className="text-lg font-medium mb-4">How would you rate your experience?</h3>
              <div className="flex justify-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {(hoverRating || rating) >= star ? (
                      <Star className="w-10 h-10 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <Star className="w-10 h-10 text-yellow-400/30" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {rating === 0 ? "Select your rating" : `You rated ${rating} star${rating > 1 ? 's' : ''}`}
              </p>
            </div>

            {/* Review Text */}
            <div>
              <h3 className="text-lg font-medium mb-2">Tell us more about your experience</h3>
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did you like about our platform? What could be improved?"
                className="min-h-[150px]"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full sm:w-auto px-8 py-6 text-lg"
                disabled={isSubmitting || rating === 0}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Thank You Message (shown after submission) */}
      {location.state?.reviewSubmitted && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
          Thank you for your review! We appreciate your feedback.
        </div>
      )}
    </div>
  );
};

export default ReviewPage;