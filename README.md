# Rovo + Forge Weather Forecaster

[![Atlassian license](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square)](LICENSE)

This is a [custom Rovo Agent implemented on the Atlassian Forge platform](https://developer.atlassian.com/platform/forge/manifest-reference/modules/rovo-agent/) used to forecast the weather using real time data sourced from [OpenWeather](openweathermap.org).

![screenshot.png](screenshot.png)

## Pre-requisites

- Install and configure the [Atlassian Forge CLI](https://developer.atlassian.com/platform/forge/getting-started/)
- (Optional) Sign up for a [free Atlassian Cloud developer site](https://developer.atlassian.com/platform/forge/getting-started/)
- Sign up for a [free OpenWeather API key](https://home.openweathermap.org/users/sign_up)
- If needed, sign up for the [Forge Rovo Agents EAP](https://ecosystem.atlassian.net/servicedesk/customer/portal/1040/group/3499/create/18386)

## Getting Started

1. Clone this repository.
```
git clone https://github.com/wildpig-glitch/rovo-weather.git
```
2. Install dependencies.
```
npm install
```
3. Register your own version of the app.
```
forge register
```
4. Configure your [OpenWeather API key](https://home.openweathermap.org/users/sign_up).
```
forge variables set OPEN_WEATHER_KEY your_api_key_here
```
5. Deploy your app.
```
forge deploy
```
6. Install your app into your Confluence site.
```
forge install
```
7. Type `/ai` while editing a Confluence page and select **Atlassian Intelligence**
8. Select **Browse Agents**
9. Select **Weather Forecaster** (apply the ⭐️ to have it show up in the default agent menu)
10. Start chatting about the weather!

## More info

Free OpenWeather API keys provide forecasts for three hour intervals going forward five days. For more granular weather data or longer forecasts (and a range of [other awesome weather-related APIs](https://openweathermap.org/api)) consider upgrading your OpenWeather account to a paid subscription.

## Debugging

You can use the [`forge tunnel`](https://developer.atlassian.com/platform/forge/change-the-frontend-with-forge-ui/#set-up-tunneling) command to run your Forge app locally. 

## License

Copyright (c) 2024 Atlassian and others.
Apache 2.0 licensed, see [LICENSE](LICENSE) file.

[![From Atlassian](https://raw.githubusercontent.com/atlassian-internal/oss-assets/master/banner-cheers.png)](https://www.atlassian.com)
