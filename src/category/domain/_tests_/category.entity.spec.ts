import { Uuid } from "../../../shared/domain/value-objects/uuid.vo"
import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
    describe('create command', () => {
        // Triple AAA - Arrange, Act e Assert
        test('should create a category value', () => {
            let category = new Category({
                name: 'Electronics'
            })
            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toBe('Electronics')
            expect(category.description).toBeNull()
            expect(category.is_active).toBeTruthy()
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
    
        test("should change name", () => {
            const category = new Category({
                name: 'Books'
            })
            category.changeName('Magazines')
            expect(category.name).toBe('Magazines')
        })

        test('should change description', () => {
            const category = new Category({
                name: 'Clothing',
                description: 'Fashionable clothing items'
            })
            category.changeDescription('New styles and trends')
            expect(category.description).toBe('New styles and trends')
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