import { Uuid } from "../../../shared/domain/value-objects/uuid.vo"
import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
    let validateSpy: any;
    beforeEach(() => {
        validateSpy = jest.spyOn(Category, "validate")
    })
    describe('construtor', () => {
        // Triple AAA - Arrange, Act e Assert
        test('should create a category value constructor', () => {
            let category = new Category({
                name: 'Electronics'
            })
            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toBe('Electronics')
            expect(category.description).toBeNull()
            expect(category.is_active).toBe(true)
            expect(category.created_at).toBeInstanceOf(Date)
            
        })
        
        test('should create a category value with', () => {
            const created_at = new Date();
            const category = new Category({
                name: 'Movies',
                description: 'Action and Adventure movies',
                is_active: false,
                created_at: created_at
            })

            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toBe('Movies')
            expect(category.description).toBe('Action and Adventure movies')
            expect(category.is_active).toBeFalsy()
            expect(category.created_at).toBe(created_at)
            
        })
        
    })

    describe('create command', () => {

        test('should create a category command', () => {
            let category = Category.create({
                name: "Movies"
            })
            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toBe('Movies')
            expect(category.description).toBeNull()
            expect(category.is_active).toBe(true)
            expect(category.created_at).toBeInstanceOf(Date)
            expect(validateSpy).toHaveBeenCalledTimes(1);
            
        })

        test("should change name", () => {
            const category = Category.create({
                name: 'Books'
            })
            category.changeName('Magazines')
            expect(category.name).toBe('Magazines')
            expect(validateSpy).toHaveBeenCalledTimes(2);
        })

        test('should change description', () => {
            const category = Category.create({
                name: 'Clothing',
                description: 'Fashionable clothing items'
            })
            category.changeDescription('New styles and trends')
            expect(category.description).toBe('New styles and trends')
            expect(validateSpy).toHaveBeenCalledTimes(2);
        })

        test('should activate category', () => {
            const category = new Category({
                name: 'Health',
                is_active: false
            })
            category.activate()
            expect(category.is_active).toBeTruthy()
        })

        test('should deactivate category', () => {
            const category = new Category({
                name: 'Home',
                is_active: true
            })
            category.deactivate()
            expect(category.is_active).toBeFalsy()
        })
    })

    describe('createCategory', () => {
        test('should create a category', () => {
            const category = Category.create({
                name: 'Sports'
            })
            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toBe('Sports')
            expect(category.description).toBeNull()
            expect(category.is_active).toBeTruthy()
            expect(category.created_at).toBeInstanceOf(Date)
            expect(validateSpy).toHaveBeenCalledTimes(1);
        })
    })

    describe('category_id', () => {
        const arrange = [
            {category_id: null}, {category_id: undefined}, {category_id: new Uuid()}
        ]

        test.each(arrange)('id = %j', ({category_id}) => {
            const category = new Category({
                name: 'Tech',
                category_id: category_id as any
            })
            expect(category.category_id).toBeInstanceOf(Uuid)
            if(category_id instanceof Uuid) {
                expect(category.category_id.id).toBe(category_id.id)
            }
        })
    })

})

describe('Category validate', () => {
    describe('create command', () => {
        test('should an invalid category with name property', () => {
            expect(() => Category.create({name: null})).containsErrorMessage({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ]
            })

            expect(() => Category.create({name: ""})).containsErrorMessage({
                name: [
                    "name should not be empty",
                ]
            })

            expect(() => Category.create({name: 5 as any})).containsErrorMessage({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal 255 characters"
                ]
            })

            expect(() => Category.create({name: "t".repeat(256)})).containsErrorMessage({
                name: [
                    "name must be shorter than or equal to 255 characters",
                ]
            })
        })
    })
})