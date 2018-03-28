# Changelog

## [v1.0.5] - 2018-03-28
### Changed
- updated demo link in README

## [v1.0.4] - 2018-02-05
### Changed
- when ResizeAction finishes (mouse up) set the `height` and `width` attributes rather than the `style`. This emits the text-change quill event and updates the document which can be seen in quill.getContents()

### Fixed
- typescript definition for `BlotSpec.getActions()` and `Options.specs`

## [v1.0.3] - 2018-01-15
### Added
- TypeScript definitions
