import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface StarRatingProps {
  rating: number;
  size?: number;
  color?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 16, color = '#FFD700' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<Icon key={i} name="star" size={size} color={color} />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<Icon key={i} name="star-half-o" size={size} color={color} />);
    } else {
      stars.push(<Icon key={i} name="star-o" size={size} color={color} />);
    }
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default StarRating;
