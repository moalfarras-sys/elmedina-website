# IPTV OS Experience — Android TV + Mobile Research Blueprint

This blueprint converts the product request into an implementable native Android plan for a premium IPTV operating-system-style app. It is based on current Android and Media3 guidance reviewed on 2026-05-06.

## Research sources applied

- Android TV app quality guidelines: five-way D-pad navigation, remote media key behavior, TV launcher presentation, and performance expectations. Source: https://developer.android.google.cn/docs/quality-guidelines/tv-app-quality?hl=en
- Android TV app startup guidance: TV apps should declare TV launcher support and provide a simple 10-foot UI for remote navigation. Source: https://developer.android.com/training/tv/start/start.html
- Media3 ExoPlayer HLS support: HLS streams support MPEG-TS, fMP4/CMAF, captions, metadata, adaptive variant selection, regular live playback, low-latency HLS, and CMCD. Source: https://developer.android.com/media/media3/exoplayer/hls
- Media3 release/dependency guidance: use AndroidX Media3 ExoPlayer modules including HLS and DASH modules. Source: https://developer.android.com/jetpack/androidx/releases/media3
- Offline-first architecture guidance: local data is the source of truth, sync work can be delegated to WorkManager, and persistent queues belong in Room/DataStore. Source: https://developer.android.com/topic/architecture/data-layer/offline-first?hl=en
- Paging 3 guidance: use PagingSource and Kotlin coroutines to gradually load large data sets. Source: https://developer.android.com/topic/libraries/architecture/paging/v3-paged-data

## Native Android architecture target

```text
app-tv / app-mobile
  -> feature-auth
  -> feature-home
  -> feature-live-tv
  -> feature-movies
  -> feature-series
  -> feature-player
  -> feature-search
  -> feature-settings
  -> feature-recommendations
  -> core-ui
  -> core-navigation
  -> core-domain
  -> core-data
  -> core-database
  -> core-network
  -> core-streaming
  -> core-sync
  -> core-analytics
```

## Data ingestion pipeline

1. Detect server type from input: Xtream credentials, remote M3U/M3U8 URL, or local file.
2. Run parser in chunks on background dispatchers.
3. Normalize into common entities: `Channel`, `VodAsset`, `Series`, `Season`, `Episode`, `EpgProgram`, `Category`, `StreamSource`, `Artwork`.
4. Persist batches into Room with stable IDs and sync metadata.
5. Expose catalog screens only from Room through Paging 3.
6. Enrich missing metadata with TMDB, OMDB, Fanart, TVMaze, and EPG endpoints through rate-limited workers.
7. Keep UI usable immediately after login while sync continues in the background.

## Streaming engine rules

- Use Media3 ExoPlayer as the internal player.
- Register HLS, DASH, progressive, subtitle, and track-selection support at the `core-streaming` boundary.
- Maintain two player profiles: low-latency muted preview and full playback.
- Surface quality, audio, subtitles, subtitle delay, speed, zoom, hardware/software decoder fallback, and external-player intents.
- Capture QoE metrics: startup time, rebuffer ratio, dropped frames, fatal stream errors, and track changes.

## Android TV UX rules

- Every interactive surface must be reachable by five-way D-pad.
- Focus state must be obvious at 10-foot distance and animated without layout jumps.
- OK triple-click toggles favorites.
- Three-second long press opens the contextual options sheet.
- Back navigates progressively; double back on Home displays a premium exit confirmation.
- TV media keys should map to playback controls when the player is active.

## Performance budget

- Never hold the full IPTV catalog in memory.
- Parse and insert in bounded batches.
- Use database-backed PagingSource for all large lists.
- Cache images with strict size hints and disk cache.
- Debounce search and keep normalized local search indexes.
- Offload networking, parsing, and metadata enrichment to WorkManager/coroutines.
- Keep preview playback isolated from full playback to prevent contention.

## Security note

The WeatherAPI and API-Football keys provided in the request must not be hardcoded in shipped client UI. Production builds should proxy those services through a backend or inject keys with environment-specific secrets management and abuse controls.
