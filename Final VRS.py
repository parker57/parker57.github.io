#List notes.
##tiles=[]
##
##for i in range(10):
##    tiles.append([i,i])
##
##print(tiles)
##
##print(tiles[2])
##for i in tiles:
##    print (i[0])
##    print(i)
##
##print (tiles[-1])
##print(tiles[1])
##print('@@@@')
##for i in range(10):
##    del tiles[0]
##    tiles.insert(0,(0,0))
##    print(tiles[0])

##>>> import pygame
##>>> all_fonts = pygame.font.get_fonts()
##>>> print(all_fonts)
#Fonts built into pygame^^

'''Load a picture, utilise classes, score, sound effects, menu etc, basic concept is there though.
Could try putting in pillars like flappy birds, narrowing the bullet range accordingly.'''
#MAKE LENGTH RANDOM
#can't code a tunnel list, so used obstacles instead.

import pygame
import time
import random

GameName='Flappy Sim'#used for caption and menu.
pygame.init()


red = (255,0,0)
HeliColor = (30,200,75)
AIColor=(50,50,50)

white = (255,255,255)
black = (0,0,0)

bright_red = (255,0,0)
bright_green = (0,255,0)

display_width = 900
display_height  = 600


gameScreen = pygame.display.set_mode((display_width,display_height))
pygame.display.set_caption(GameName)

clock = pygame.time.Clock()

bullet_size = 20#Size of each chunk of bullet.
FPS = 30#Frames per second

Health_font = pygame.font.SysFont('ubuntu',50,bold=True)
Score_font = pygame.font.SysFont('ubuntu', 25,bold=False)

def Print_Score(mes,colour):
    score_text = Score_font.render(mes, 1, colour)
    gameScreen.blit(score_text, [display_width*5/7, 25])

def text_objects(text, font):
    textSurface = font.render(text, True, black)
    return textSurface, textSurface.get_rect()

def Bullet(bullet_size, bullet_path):
    for XandY in bullet_path:#a for loop for a list where XandY[0] is x, and [1] is y...
        #display_width//255
        pygame.draw.rect(gameScreen, (random.randint(0,255),XandY[1]%255,((XandY[0]+bullet_size)/(display_width/255)%255)), [XandY[0],XandY[1],bullet_size,bullet_size])

def Print_Health(msg,color):
    screen_text = Health_font.render(msg, 1, color)
    gameScreen.blit(screen_text, [bullet_size, 0])#can not get centring to work.


def button(msg,x,y,w,h,i,a,action=None):
    mouse = pygame.mouse.get_pos()
        # print(mouse)
    click = pygame.mouse.get_pressed()
##    print(click)
    

    if x+w > mouse[0] > x and y+h > mouse[1] > y:
        pygame.draw.rect(gameScreen, a,(x,y,w,h))
        if click[0] ==1 and action !=None:
            action()
            
##            if action == "Play":
##                gameLoop()
##            elif action == "Quit":
##                pygame.quit()
##                quit
                
                
            
    else:
        pygame.draw.rect(gameScreen, i,(x,y,w,h))

    smallText = pygame.font.Font("freesansbold.ttf",20)
    textSurf, textRect = text_objects(msg, smallText)
    textRect.center = ((x+(w/2)), (y+(h/2)) )
    gameScreen.blit(textSurf, textRect)

def game_intro():
    gameOver=True
    while gameOver == True:
        for event in pygame.event.get():
            
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
                
        gameScreen.fill(white)
        largeText = pygame.font.Font('freesansbold.ttf', 115)
        TextSurf, TextRect = text_objects(GameName, largeText)
        TextRect.center = ((display_width/2),(display_height/2))
        gameScreen.blit(TextSurf, TextRect)

        
        button("Start!",150,450,100,50,HeliColor,bright_green, gameLoop)
        button("Quit!",550,450,100,50,red,bright_red,quit)

        
        pygame.display.update()
        clock.tick(FPS)

def gameLoop():
    
    gameOver = False
    pygame.display.update()
    HeliLat=50
    HeliHeight=50
    HeliWidth=50
    AIHeight=50
    AISpeed=3
    lift=0

    Exit = False

    Health=100
    Score = 0
    
    bullet_path=[]
    bullet_length=30

    bullet_x=display_width
    bullet_y=random.randint(100,(display_height-bullet_size-100))
    

    while not Exit:

        while gameOver == False:
        
            for event in pygame.event.get():
                if event.type == pygame.QUIT:#Quit is not working during in game?
                    gameOver=True#No idea why this works?
                    Exit = True
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_UP:
                        lift=-22#MAIN GAME ATTRIBUTE, DETERMINES HOW HIGH JUMP IS.
                        

            gameScreen.fill(white)
            lift+=1
            HeliLat+=lift#latitude
            pygame.draw.rect(gameScreen, HeliColor, [display_height//4,HeliLat,HeliWidth,HeliHeight])
            bullet_x-=bullet_size
            
            Main_bullet=[]
            Main_bullet.append(bullet_x+random.randint(-1,1))
            Main_bullet.append(bullet_y+random.randint(-bullet_size,bullet_size))
            bullet_path.append(Main_bullet)
            
            if len(bullet_path)>bullet_length:
                del bullet_path[0]

            
            if bullet_path[-1][0]+bullet_length*bullet_size<(0-bullet_size):
                bullet_x=display_width-bullet_size
                bullet_y=random.randint(0,display_height-bullet_size)
                if Health<98:#restore some health once bullet has passed
                    Health+=2
                elif Health>=98:
                    Health=100
            Score += 0.2

            Bullet(bullet_size, bullet_path)
        
            #draw optimum position AI.
            if bullet_y>(display_height-(bullet_y+bullet_size)):
                AIdest=bullet_y/2
            else:
                AIdest=(bullet_y+bullet_size)+((display_height-(bullet_y+bullet_size))/2)

            if AIHeight+AISpeed<AIdest:
                AIHeight+=AISpeed
            elif AIHeight>AIdest+AISpeed:
                AIHeight-=AISpeed
            else:
                AIHeight=AIHeight
            pygame.draw.rect(gameScreen, AIColor, [(display_height//4)+HeliWidth,AIHeight,HeliWidth,HeliHeight])
             
            if HeliLat>=(display_height-HeliHeight):#This is collision, if the Heli hits the top of the bottom, health slowly decreases.
                lift=0
                HeliLat=(display_height-HeliHeight)
                Health-=1
            if HeliLat<0:
                Health-=1

            if (HeliLat+HeliHeight)>=bullet_y and HeliLat<=(bullet_y+bullet_size):#if y co-ordinates equate
                if bullet_path[-1][0]<(display_height//4+HeliWidth) and bullet_path[0][0]+bullet_size>=display_height//4:#x co ordiate equate
                    Health-=10
                    #^Collision of bullet and Heli square.
    ##        else:
    ##            Health+=1

            Print_Health('Health: '+str(Health)+'%',red) 
            Print_Score('Score: '+str(("%.0f" % round(Score,2))), black) #return score to main menu
            if Health<=0:
                
                game_intro()
            
            
            pygame.display.update()
            clock.tick(FPS)
game_intro()
gameLoop()
        
pygame.quit()
quit()
