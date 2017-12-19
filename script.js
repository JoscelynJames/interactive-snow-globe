function shake() {
	var shakeTimeline = anime.timeline();
	var tiltRight = {
		targets: 'svg',
		rotate: {
			value: 30,
			duration: 300,
			easing: 'easeInOutCirc'
		},
	}

	var tileLeft = {
		targets: 'svg',
		rotate: {
			value: -30,
			duration: 300,
			easing: 'easeInOutCirc'
		},
	}

	shakeTimeline
		.add(tiltRight)
		.add(tileLeft)
		.add(tiltRight)
		.add(tileLeft)
		.add({
			targets: 'svg',
			rotate: {
				value: 0,
				duration: 300,
				easing: 'easeInOutCubic'
			},
		})
}

