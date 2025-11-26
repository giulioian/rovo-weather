export async function clothingSuggestions(req) {
  console.log('Clothing suggestions request:', req);

  // Handle different request formats
  const payload = req.payload || req;
  const { temperature, description, rain, snow, season, region } = payload;

  try {
    // Validate required inputs
    if (typeof temperature !== 'number' || !description) {
      throw new Error('Temperature (number) and description (string) are required');
    }

    // Determine the season if not provided
    const currentSeason = season || getCurrentSeason();
    
    // Generate clothing recommendations based on temperature and conditions
    const suggestions = generateClothingRecommendations(
      temperature, 
      description, 
      rain, 
      snow, 
      currentSeason, 
      region
    );

    console.log('Generated clothing suggestions:', suggestions);
    return suggestions;
  } catch (error) {
    console.error('Error generating clothing suggestions:', error);
    throw new Error('Failed to generate clothing suggestions: ' + error.message);
  }
}

function getCurrentSeason() {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

function generateClothingRecommendations(temperature, description, rain, snow, season, region) {
  const recommendations = {
    layers: [],
    accessories: [],
    footwear: [],
    specialConsiderations: []
  };

  // Temperature-based recommendations
  if (temperature <= 0) {
    recommendations.layers.push('Heavy winter coat or down jacket', 'Thermal underwear', 'Wool sweater', 'Insulated pants');
    recommendations.accessories.push('Winter hat', 'Insulated gloves', 'Scarf', 'Face mask');
    recommendations.footwear.push('Insulated winter boots with good traction');
    recommendations.specialConsiderations.push('Layer clothing to trap warm air', 'Cover exposed skin to prevent frostbite');
  } else if (temperature <= 10) {
    recommendations.layers.push('Warm jacket or coat', 'Long-sleeve shirt', 'Sweater or fleece');
    recommendations.accessories.push('Warm hat', 'Gloves', 'Light scarf');
    recommendations.footwear.push('Closed-toe shoes or boots');
    recommendations.specialConsiderations.push('Layer clothing for temperature regulation');
  } else if (temperature <= 20) {
    recommendations.layers.push('Light jacket or cardigan', 'Long-sleeve shirt or light sweater');
    recommendations.accessories.push('Light scarf (optional)');
    recommendations.footwear.push('Comfortable walking shoes');
    recommendations.specialConsiderations.push('Perfect temperature for light layers');
  } else if (temperature <= 25) {
    recommendations.layers.push('T-shirt or short-sleeve shirt', 'Light cardigan or jacket (for evening)');
    recommendations.footwear.push('Comfortable shoes or sneakers');
    recommendations.specialConsiderations.push('Comfortable temperature, minimal layering needed');
  } else if (temperature <= 30) {
    recommendations.layers.push('Light, breathable clothing', 'T-shirt or tank top', 'Light pants or shorts');
    recommendations.accessories.push('Sun hat', 'Sunglasses');
    recommendations.footwear.push('Breathable shoes or sandals');
    recommendations.specialConsiderations.push('Stay hydrated', 'Seek shade during peak sun hours');
  } else {
    recommendations.layers.push('Minimal, light-colored clothing', 'Loose-fitting shirt', 'Shorts');
    recommendations.accessories.push('Wide-brimmed hat', 'Sunglasses', 'Sunscreen');
    recommendations.footwear.push('Breathable sandals or light shoes');
    recommendations.specialConsiderations.push('Stay in air conditioning when possible', 'Drink plenty of water', 'Avoid prolonged sun exposure');
  }

  // Weather condition adjustments
  const lowerDescription = description.toLowerCase();
  
  if (rain || lowerDescription.includes('rain')) {
    recommendations.layers.push('Waterproof jacket or raincoat');
    recommendations.accessories.push('Umbrella');
    recommendations.footwear = ['Waterproof boots or shoes with good grip'];
    recommendations.specialConsiderations.push('Stay dry to maintain body temperature');
    
    // Parse rain data if provided as string
    if (typeof rain === 'string') {
      try {
        const rainData = JSON.parse(rain);
        const rainAmount = rainData['3h'] || rainData['1h'] || 0;
        if (rainAmount > 5) {
          recommendations.specialConsiderations.push('Heavy rain expected - consider waterproof pants');
        }
      } catch (e) {
        console.warn('Could not parse rain data:', rain);
      }
    }
  }

  if (snow || lowerDescription.includes('snow')) {
    recommendations.layers.push('Waterproof outer layer', 'Insulating middle layer');
    recommendations.accessories.push('Waterproof gloves', 'Snow goggles or sunglasses');
    recommendations.footwear = ['Insulated, waterproof boots with good traction'];
    recommendations.specialConsiderations.push('Layer for warmth and moisture management', 'Be cautious of slippery surfaces');
    
    // Parse snow data if provided as string
    if (typeof snow === 'string') {
      try {
        const snowData = JSON.parse(snow);
        const snowAmount = snowData['3h'] || snowData['1h'] || 0;
        if (snowAmount > 10) {
          recommendations.specialConsiderations.push('Heavy snow expected - consider snow pants and extra warm layers');
        }
      } catch (e) {
        console.warn('Could not parse snow data:', snow);
      }
    }
  }

  if (lowerDescription.includes('wind')) {
    recommendations.layers.push('Windproof outer layer');
    recommendations.accessories.push('Secure hat or hood');
    recommendations.specialConsiderations.push('Protect against wind chill');
  }

  if (lowerDescription.includes('sun') || lowerDescription.includes('clear')) {
    recommendations.accessories.push('Sunscreen', 'Sunglasses');
    if (temperature > 20) {
      recommendations.specialConsiderations.push('UV protection recommended');
    }
  }

  // Regional adjustments
  if (region) {
    const lowerRegion = region.toLowerCase();
    if (lowerRegion.includes('tropical')) {
      recommendations.specialConsiderations.push('High humidity - choose moisture-wicking fabrics');
    } else if (lowerRegion.includes('arctic') || lowerRegion.includes('polar')) {
      recommendations.specialConsiderations.push('Extreme cold protection essential', 'Avoid cotton fabrics');
    } else if (lowerRegion.includes('desert')) {
      recommendations.specialConsiderations.push('Protect from sun and sand', 'Light colors to reflect heat');
    }
  }

  // Remove duplicates
  Object.keys(recommendations).forEach(key => {
    recommendations[key] = [...new Set(recommendations[key])];
  });

  return recommendations;
}