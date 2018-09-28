'use strict';

QUnit.module('Тестируем функцию plainify', function () {
	QUnit.test('plainify работает правильно', function (assert) {
		assert.deepEqual(plainify({foo: 'bar', baz: 42}), {'foo': 'bar', 'baz': 42});

		const nested1 = {
			deep: {
				foo: 'bar',
				baz: 42
			}
		};

		const plain1 = {
			'deep.foo': 'bar',
			'deep.baz': 42
		};

		assert.deepEqual(plainify(nested1), plain1);

		const nested2 = {
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42
						}
					}
				}
			}
		};

		const plain2 = {
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42
		};

		assert.deepEqual(plainify(nested2), plain2);
	});

	QUnit.test('Plainify c объектом из двух свойств с вложенностью', function (assert) {
        const nested1 = {
            deep: {
                foo: 'bar',
                baz: 42
            },
            feep: {
                goo: 65,
                bag: 'parapa'
            }
        };

        const plain1 = {
            'deep.foo': 'bar',
            'deep.baz': 42,
            'feep.goo': 65,
            'feep.bag': 'parapa'
        };

        assert.deepEqual(plainify(nested1), plain1);
    });

    QUnit.test('Plainify c объектом в котром множество свойств', function (assert) {
        const nested1 = {
            deep: {
                foobar: 0,
                nested: {
                    object: {
                        fields: {
                            foo: 42,
                            bar: 42,
                            baz: 42
                        }
                    }
                }
            },
            deeped: {
                foobared: 9,
                nesteded: {
                    objected: {
                        fieldsed: {
                            fooed: 24,
                            bared: 31,
                            bazed: 45
                        }
                    }
                }
            }
        };

        const plain1 = {
            'deep.foobar': 0,
            'deep.nested.object.fields.foo': 42,
            'deep.nested.object.fields.bar': 42,
            'deep.nested.object.fields.baz': 42,
            'deeped.foobared': 9,
            'deeped.nesteded.objected.fieldsed.fooed': 24,
            'deeped.nesteded.objected.fieldsed.bared': 31,
            'deeped.nesteded.objected.fieldsed.bazed': 45
        };

        assert.deepEqual(plainify(nested1), plain1);
    });

    QUnit.test('Plainify c пестым объектом и массивом вместо объекта', function (assert) {
        const nested1 = {};
        const plain1 = {};

        assert.deepEqual(plainify(nested1), plain1);

        const nested2 = [];
        const plain2 = {};

        assert.deepEqual(plainify(nested1), plain1);
    });
});
